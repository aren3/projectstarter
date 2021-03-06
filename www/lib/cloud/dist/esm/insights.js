import { parseSemanticVersion } from './util';
/**
 * @hidden
 */
var Stat = (function () {
    function Stat(appId, stat, value) {
        if (value === void 0) { value = 1; }
        this.appId = appId;
        this.stat = stat;
        this.value = value;
        this.appId = appId;
        this.stat = stat;
        this.value = value;
        this.created = new Date();
    }
    Stat.prototype.toJSON = function () {
        return {
            app_id: this.appId,
            stat: this.stat,
            value: this.value,
            created: this.created.toISOString(),
        };
    };
    return Stat;
}());
export { Stat };
/**
 * A client for Insights that handles batching, user activity insight, and
 * sending insights at an interval.
 *
 * @hidden
 */
var Insights = (function () {
    function Insights(deps, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.options = options;
        this.app = deps.appStatus;
        this.storage = deps.storage;
        this.config = deps.config;
        this.client = deps.client;
        this.device = deps.device;
        this.logger = deps.logger;
        this.batch = [];
        if (typeof this.options.enabled === 'undefined') {
            this.options.enabled = true;
        }
        if (typeof this.options.intervalSubmit === 'undefined') {
            this.options.intervalSubmit = 60 * 1000;
        }
        if (typeof this.options.intervalActiveCheck === 'undefined') {
            this.options.intervalActiveCheck = 1000;
        }
        if (typeof this.options.submitCount === 'undefined') {
            this.options.submitCount = 100;
        }
        if (this.options.enabled) {
            if (this.options.intervalSubmit) {
                setInterval(function () {
                    _this.submit();
                }, this.options.intervalSubmit);
            }
            if (this.options.intervalActiveCheck) {
                setInterval(function () {
                    if (!_this.app.closed) {
                        _this.checkActivity();
                    }
                }, this.options.intervalActiveCheck);
            }
        }
    }
    /**
     * Track an insight.
     *
     * @param stat - The insight name.
     * @param value - The number by which to increment this insight.
     */
    Insights.prototype.track = function (stat, value) {
        if (value === void 0) { value = 1; }
        if (this.options.enabled) {
            this.trackStat(new Stat(this.config.get('app_id'), stat, value));
        }
        else {
            this.logger.warn('Ionic Insights: Will not track(), insights are not enabled.');
        }
    };
    Insights.prototype.checkActivity = function () {
        var session = this.storage.get('insights_session');
        if (!session) {
            this.markActive();
        }
        else {
            var d = new Date(session);
            var hour = 60 * 60 * 1000;
            if (d.getTime() + hour < new Date().getTime()) {
                this.markActive();
            }
        }
    };
    Insights.prototype.markActive = function () {
        this.track('mobileapp.active');
        if (!this.device.native || typeof this.device.native.platform !== 'string') {
            this.logger.warn('Ionic Insights: Device information unavailable.');
        }
        else {
            var device = this.device.native;
            var platform = this.normalizeDevicePlatform(device.platform);
            var platformVersion = this.normalizeVersion(device.version);
            var cordovaVersion = this.normalizeVersion(device.cordova);
            this.track("mobileapp.active.platform." + platform);
            this.track("mobileapp.active.platform." + platform + "." + platformVersion);
            this.track("mobileapp.active.cordova." + cordovaVersion);
        }
        this.storage.set('insights_session', new Date().toISOString());
    };
    Insights.prototype.normalizeDevicePlatform = function (platform) {
        return platform.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    };
    Insights.prototype.normalizeVersion = function (s) {
        var v;
        try {
            v = String(parseSemanticVersion(s).major);
        }
        catch (e) {
            v = 'unknown';
        }
        return v;
    };
    Insights.prototype.trackStat = function (stat) {
        this.batch.push(stat);
        if (this.shouldSubmit()) {
            this.submit();
        }
    };
    Insights.prototype.shouldSubmit = function () {
        return this.batch.length >= this.options.submitCount;
    };
    Insights.prototype.submit = function () {
        var _this = this;
        if (this.batch.length === 0) {
            return;
        }
        var insights = [];
        for (var _i = 0, _a = this.batch; _i < _a.length; _i++) {
            var stat = _a[_i];
            insights.push(stat.toJSON());
        }
        this.client.post('/insights')
            .send({ 'insights': insights })
            .end(function (err, res) {
            if (err) {
                _this.logger.error('Ionic Insights: Could not send insights.', err);
            }
        });
        this.batch = [];
    };
    return Insights;
}());
export { Insights };
