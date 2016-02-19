class ActiveRafflesController {
  constructor() {
    /* jscs:disable */
    this._resultsFromRaffleService = {
      charity: {
        name: 'United Way',
        description: 'The United Way seeks to blah...'
      },
      raffles: [
        {
          item: {
            name: 'Apple iWatch Sport',
            thumbnail: 'http://store.storeimages.cdn-apple.com/4951/as-images.apple.com/is/image/AppleInc/aos/published/images/s/38/s38sg/sbbk/s38sg-sbbk-sel-201509_GEO_US?wid=848&hei=848&fmt=jpeg&qlt=80&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1441818470783'
          },
          tickets: {
            remaining: 17,
            total: 100
          }
        },
        {
          item: {
            name: 'Yeti Tundra',
            thumbnail: 'http://cdn.yeticoolers.com/media/catalog/product/cache/1/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/y/t/yt35bf_new.jpg'
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
    this.raffles = this._resultsFromRaffleService.raffles;

    this._activate();
  }

  _activate() {
  }
}

ActiveRafflesController.$inject = [];

export {ActiveRafflesController};
