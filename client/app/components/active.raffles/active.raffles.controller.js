class ActiveRafflesController {
  constructor() {
    /* jscs:disable */
    this._resultsFromRaffleService = {
      charity: {
        name: 'Help Sara Beat Leukemia',
        url: 'https://www.gofundme.com/24kun5uc',
        description: 'My three year old niece, Sara, was diagnosed with acute lymphoblastic leukemia last week. Many of you have asked how you can help the family. First, we are asking that you donate blood. There are so many procedures that can\'t happen because cancer patients don\'t have the blood products they need. Second, if you feel like it\'s possible, register as a bone marrow donor. Third, if you would like to help the family financially you can donate to our GoFundMe account. These funds will be used for medical expenses that the insurance will not cover. Please keep Sara and her family in your thoughts and prayers. Help Sara win this battle against leukemia.'
      },
      raffles: [
        {
          id: 'abc123',
          item: {
            name: 'Apple iWatch Sport',
            thumbnailUrl: 'http://store.storeimages.cdn-apple.com/4951/as-images.apple.com/is/image/AppleInc/aos/published/images/s/38/s38sg/sbbk/s38sg-sbbk-sel-201509_GEO_US?wid=848&hei=848&fmt=jpeg&qlt=80&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818470783'
          },
          tickets: {
            remaining: 17,
            total: 100
          }
        },
        {
          id: 'edf456',
          item: {
            name: 'Yeti Tundra',
            thumbnailUrl: 'http://cdn.yeticoolers.com/media/catalog/product/cache/1/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/y/t/yt35bf_new.jpg'
          },
          tickets: {
            remaining: 83,
            total: 100
          }
        }
      ]
    };
    /* jscs:enable */

    // TODO: Replace with Raffles.getActive()
    this.raffleEvents = [this._resultsFromRaffleService];

    this._activate();
  }

  _activate() {
  }
}

ActiveRafflesController.$inject = [];

export {ActiveRafflesController};
