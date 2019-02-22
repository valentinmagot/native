var observableModule = require("tns-core-modules/data/observable");

function HomeViewModel() {
  var viewModel = observableModule.fromObject({

    footer_icon : String.fromCharCode(0xeA0A),

    icons: [
      { name: "Change Request", icon: String.fromCharCode(0xe933) },
      { name: "GCdocs 16 - Gold Build Configuration", icon: String.fromCharCode(0xe92A) },
      { name: "OTDS FAQ", icon: String.fromCharCode(0xe92A) },
      { name: "Product and Features Analysis", icon: String.fromCharCode(0xe933) },
      { name: "GCdocs Technical FAQ", icon: String.fromCharCode(0xe92A) },
      { name: "Mobility Enhancement", icon: String.fromCharCode(0xe933) },
      { name: "Promotional Material", icon: String.fromCharCode(0xe933) },
      { name: "Business Case Scenarios", icon: String.fromCharCode(0xe9cb) },
    ],

    onItemTap: function (args) {
      console.log('Item with index: ' + args.index + ' tapped');
    },


  });

  return viewModel;
}

module.exports = HomeViewModel;
