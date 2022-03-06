const HtmlWebpackPlugin= require("html-webpack-plugin");
const path= require("path");


module.exports={

     entry:{
         index:["@babel/polyfill", "./src/js/index.js"],  //applico babel / da ES7
     },

     output: {
          path: path.resolve(__dirname,"dist"),
          filename: "bundle.js",
          clean:true  //ripulisce il bundle
     },

     module:{ rules: [

          {test: /\.css$/i,                   //tutti i file che terminano in .css
          use: ["style-loader", "css-loader"]   //loader che applico da destra verso sinistra
          }  ,

          {
               test: /\.js$/i,
               exclude: /node_modules/,
               use: {
                    loader: "babel-loader",                //utilizzo babel 
                    options:{
                         presets:["@babel/preset-env"]
                    }
               }
          },
           {
                test: /\.(png|jpe?g|svg)$/i,           //applico il loader di default per le immagini
                type: "asset/resource",
                
          //         use:
          //              {loader:"url-loader",
          //               options:{
          //                    esModule:false,
          //                    name:"[name].[ext]",
          //                    outputPath:"img/foto",
          //                   publicPath:"src/img/foto"
                         
          //   }
          //  },

                

           }

     ]},


     plugins: [
          new HtmlWebpackPlugin({         //plugin per i template html
               template:"./src/index.html"
          })
             
     ],

     devServer:{
        
          open:true,
          static: path.resolve(__dirname, "dist")

     },

     mode: "development"


}

