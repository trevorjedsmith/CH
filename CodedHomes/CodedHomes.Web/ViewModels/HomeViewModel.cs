using CodedHomes.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodedHomes.Web.ViewModels
{
    public class HomeViewModel : ViewModelBase
    {
        public Home Home { get; set; }

        public bool IsNew { get; set; }

        public string HomeJSON
        {
            get
            {
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

                var homes = JsonConvert.SerializeObject(this.Home, settings);
                return homes;
            }
        }

        public string ImageUrlPrefix
        {
            get
            {
                return CodedHomes.Web.Config.ImagesUrlPrefix;
            }
        }

        public HomeViewModel()
        {
            this.Home = new Home();
        }
    }
}