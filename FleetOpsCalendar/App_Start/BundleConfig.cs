using System.Web;
using System.Web.Optimization;

namespace FleetOpsCalendar
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"
            ));
            /* 
             In developmet, the template will be rendered directly in the cshtml view
             See ~/Views/Home/App.cshtml 
              
             To enable the bundle with pre-compilation of Handlebars templates, edit 
             the web.config to disable debug, setting it to false:
             
             <configuration>
                 ...
                 <system.web>
                     <compilation debug="false" targetFramework="4.5" />
                     ...
             
             Optimizations must be enabled in Global.asax.cs Application_Start method:
             
             BundleTables.EnableOptimizations = true;
              
             The pre-compiled templates are minified by default
             If for some reason one needs the template not to be minified, do:
              
             bundles.Add(new Bundle("~/bundles/templates", 
                         new EmberHandlebarsBundleTransform() { minifyTemplate = false } ).Include(
                "~/app/templates/*.hbs"
             )); */
            if (!HttpContext.Current.IsDebuggingEnabled)
            {
                bundles.Add(new Bundle("~/bundles/templates", new EmberHandlebarsBundleTransform()).Include(
                    "~/app/templates/*.hbs"
                ));
            }
            bundles.Add(new ScriptBundle("~/bundles/ember").Include(
                "~/scripts/handlebars-1.1.2.js",
                "~/scripts/ember-{version}.js",
                "~/scripts/ember-data-1.0.0-beta2.js",
                "~/app/webapi_serializer.js",
                "~/app/webapi_adapter.js",
                 "~/scripts/serializer.js",
                 "~/scripts/json_serializer.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/ajaxlogin").Include(
                "~/app/ajaxlogin.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/app/app.js",
                "~/app/router.js",
                "~/app/helpers.js"
                ).IncludeDirectory("~/app/routes", "*.js")
                 .IncludeDirectory("~/app/models", "*.js")
                 .IncludeDirectory("~/app/views", "*.js")
                 .IncludeDirectory("~/app/controllers", "*.js")
            );

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"
            ));

            bundles.Add(new Bundle("~/Content/css", new CssMinify()).Include(
                "~/Contents/css/Skins/Skyline/css/Compact/bootstrap.css",
                "~/Contents/css/dashBoard.css",
             "~/Contents/css/bootstrap-responsive.css",
             "~/Contents/fullcalendar/fullcalendar.print.css",
             "~/Contents/fullcalendar/fullcalendar.css"
            ));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                "~/Content/themes/base/jquery.ui.core.css",
                "~/Content/themes/base/jquery.ui.resizable.css",
                "~/Content/themes/base/jquery.ui.selectable.css",
                "~/Content/themes/base/jquery.ui.accordion.css",
                "~/Content/themes/base/jquery.ui.autocomplete.css",
                "~/Content/themes/base/jquery.ui.button.css",
                "~/Content/themes/base/jquery.ui.dialog.css",
                "~/Content/themes/base/jquery.ui.slider.css",
                "~/Content/themes/base/jquery.ui.tabs.css",
                "~/Content/themes/base/jquery.ui.datepicker.css",
                "~/Content/themes/base/jquery.ui.progressbar.css",
                "~/Content/themes/base/jquery.ui.theme.css"
            ));

            bundles.Add(new ScriptBundle("~/Contents/scripts")
                .Include("~/Contents/js/jquery-2.0.2.min.js"
                , "~/Contents/js/jqueryui-1.92.min.js"
                , "~/Contents/js/bootstrap.min.js"
                , "~/Contents/js/customScripts.js"
                , "~/Contents/js/pageFuncv1x5.js"
                , "~/Contents/js/select2.min.js"
                , "~/Contents/js/jquery.pnotify.min.js"
                , "~/Contents/js/jQuery.tmpl.min.js"
                , "~/Contents/fullcalendar/fullcalendar.js"
                ));

            bundles.Add(new ScriptBundle("~/Scripts/UnbotrusiveScripts").Include("~/Scripts/jquery.unobtrusive-ajax.min.js").Include("~/Scripts/jquery.validate.min.js").Include("~/Scripts/jquery.validate.unobtrusive.min.js"));
        }
    }
}