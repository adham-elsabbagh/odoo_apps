odoo.define('badge_on_menu_enterprise.HomeMenu', function(require) {
  "use strict";
  var config = require('web.config');
  var core = require('web.core');
  var session = require('web.session');
  var HomeMenu = require('web_enterprise.HomeMenu');


  var QWeb = core.qweb;


  HomeMenu.include({
    _render: function() {
      this._super.apply(this, arguments);
      this.$el.css('padding-left', '0px');
      var self = this;

      if (!this._state.isSearching && !(config.device.size_class <= config.device.SIZES.MD)) {
        self._get_activity_data().then(function() {
          self._get_preview_data().then(function() {

            _.each(self._state.apps, function(app) {
              var activities_count = 0;
              if (app.web_icon) {

                var module = app.web_icon.split(',')[0];
                _.each(self._activities, function(activity) {
                  if (activity.icon && (activity.overdue_count || activity.today_count)) {
                    var activity_module = activity.icon.split('/')[1]
                    if (activity_module !== 'base') {
                      if (module === activity_module{
                        activities_count += activity.overdue_count + activity.today_count
                      }
                    } else {
                      var model = activity.model.split('.')[0]
                      if (module === model) {
                        activities_count += activity.overdue_count+ activity.today_count
                      }
                    }
                  }
                })
              }
              app.planned_count = activities_count
            });
            self.$mainContent.html(QWeb.render('HomeMenu.Content', {
              widget: self,
            }));
          })
        });
      }
    },

    _get_preview_data: function() {
      var self = this;
      return this.call('mail_service', 'getSystrayPreviews').then(function(data) {
        var res = []
        _.each(data, function(d) {
          if (d.id !== 'mail_failure') {
            res.push(d);
          }
        });
        self._previews = res;
      });
    },

    _get_activity_data: function() {
      var self = this;
      return self._rpc({
        model: 'res.users',
        method: 'systray_get_activities',
        args: [],
        kwargs: {
          context: session.user_context
        },
      }).then(function(data) {
        self._activities = data;
      });
    },
  });
  return HomeMenu;

});
