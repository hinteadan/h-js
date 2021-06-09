using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;

namespace HJs
{
    public class Startup
    {
        #region Construct
        readonly ILogger<Startup> logger;
        public Startup(
            ILogger<Startup> logger
        )
        {
            this.logger = logger;
        }
        #endregion

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            using (new H.Necessaire.TimeMeasurement(x => logger.LogInformation($"{DateTime.Now}: Done adding CORS in {x}")))
                services.AddCors(opts => opts.AddDefaultPolicy(bld => bld.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (new H.Necessaire.TimeMeasurement(x => logger.LogInformation($"{DateTime.Now}: Done configuring Web App Host in {x}")))
                ConfigureWebAppHost(app, env);
        }

        private void ConfigureWebAppHost(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() || env.IsEnvironment("Local"))
            {
                using (new H.Necessaire.TimeMeasurement(x => logger.LogInformation($"{DateTime.Now}: Done calling UseDeveloperExceptionPage in {x}")))
                    app.UseDeveloperExceptionPage();
            }

            if (!env.IsEnvironment("Local"))
            {
                using (new H.Necessaire.TimeMeasurement(x => logger.LogInformation($"{DateTime.Now}: Done calling UseHttpsRedirection in {x}")))
                    app.UseHttpsRedirection();
            }

            using (new H.Necessaire.TimeMeasurement(x => logger.LogInformation($"{DateTime.Now}: Done calling UseRouting in {x}")))
                app.UseRouting();

            using (new H.Necessaire.TimeMeasurement(x => logger.LogInformation($"{DateTime.Now}: Done calling UseCors in {x}")))
                app.UseCors();

            using (new H.Necessaire.TimeMeasurement(x => logger.LogInformation($"{DateTime.Now}: Done calling UseDefaultFiles in {x}")))
                app.UseDefaultFiles(new DefaultFilesOptions
                {
                    FileProvider = new PhysicalFileProvider(GetStaticFilesPath(env)),
                    RequestPath = string.Empty,
                });

            using (new H.Necessaire.TimeMeasurement(x => logger.LogInformation($"{DateTime.Now}: Done calling UseStaticFiles in {x}")))
                app.UseStaticFiles(new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(GetStaticFilesPath(env)),
                    RequestPath = string.Empty,
                });
        }

        private static string GetStaticFilesPath(IWebHostEnvironment env)
        {
            if (!env.IsEnvironment("Local"))
                return Path.Combine(env.ContentRootPath, "Content");

            return Path.Combine(env.ContentRootPath, "Content");
        }
    }
}
