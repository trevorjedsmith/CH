using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CodedHomes.Web.Startup))]
namespace CodedHomes.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
