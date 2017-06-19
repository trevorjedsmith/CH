using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace CodedHomes.Web
{
    public class Config
    {
        public static string ImagesFolderPath
        {
            get
            {
                if(ConfigurationManager.AppSettings["ImagesFolderPath"] != null)
                {
                    return ConfigurationManager.AppSettings["ImagesFolderPath"].ToString();
                }

                return "~/img/homes";
            }
        }

        public static string ImagesUrlPrefix
        {
            get
            {
                //gives us relative path
                return Config.ImagesFolderPath.Replace("~", "");
            }
        }
    }
}