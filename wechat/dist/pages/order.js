'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _side_tab = require('./../components/side_tab.js');

var _side_tab2 = _interopRequireDefault(_side_tab);

var _imageList = require('./../components/imageList.js');

var _imageList2 = _interopRequireDefault(_imageList);

var _searchbar = require('./../components/searchbar.js');

var _searchbar2 = _interopRequireDefault(_searchbar);

var _cart = require('./../components/cart.js');

var _cart2 = _interopRequireDefault(_cart);

var _base = require('./../mixins/base.js');

var _base2 = _interopRequireDefault(_base);

var _http = require('./../mixins/http.js');

var _http2 = _interopRequireDefault(_http);

var _foodList = require('./../components/foodList.js');

var _foodList2 = _interopRequireDefault(_foodList);

var _icon = require('./../components/icon.js');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var order = function (_wepy$page) {
  _inherits(order, _wepy$page);

  function order() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = order.__proto__ || Object.getPrototypeOf(order)).call.apply(_ref, [this].concat(args))), _this), _this.mixins = [_base2.default, _http2.default], _this.config = {
      navigationBarTitleText: '订餐服务'
    }, _this.$repeat = {}, _this.$props = { "SideTab": { "v-bind:tab.sync": "categories" }, "foodList": { "v-bind:toView.sync": "selectView", "class": "goods-box", "v-bind:list.sync": "foodList", "v-bind:chooseList.sync": "choosedList", "v-bind:catList.sync": "categoriesList", "v-bind:dealList.sync": "dealList" }, "SearchBar": { "type": "tag", "xmlns:v-bind": "", "v-bind:placeholder.once": "searchText", "xmlns:v-on": "" }, "Cart": { "v-bind:flag.sync": "cartShow", "v-bind:chooseList.sync": "choosedList", "v-bind:list.sync": "foodList", "v-bind:catList.sync": "categoriesList", "v-bind:dealList.sync": "dealList" } }, _this.$events = { "SideTab": { "v-on:change": "switchTab" }, "SearchBar": { "v-on:search": "searchFood", "v-on:clear": "clearSearch" }, "Cart": { "v-on:clear": "clear" } }, _this.components = {
      SideTab: _side_tab2.default,
      imageList: _imageList2.default,
      foodList: _foodList2.default,
      SearchBar: _searchbar2.default,
      Cart: _cart2.default,
      icon: _icon2.default
    }, _this.mixins = [], _this.data = {
      init: true,
      cartShow: false,
      searchText: '请输入商品名称',
      categories: {},
      categoriesList: [],
      foodList: [],
      selectedId: 1,
      choosedList: [], //购物车选中的菜品
      dealList: [], //deal cart data
      currentPriceSort: 1,
      currentStarSort: 1,
      currentSortRule: '',
      priceSortIcon: 'icon-paixu-shuliangshengxu',
      starSortIcon: 'icon-dianzan'
    }, _this.computed = {
      selectView: function selectView() {
        var text = 'a' + this.selectedId;
        return text;
      }
    }, _this.methods = {
      // 点击分类
      switchTab: function switchTab(selectedId) {
        console.log(selectedId);
        this.selectedId = selectedId;
      },
      searchFood: function searchFood(res) {
        console.log("search", res);
        if (res) {
          this.foodList = this.foodList.filter(function (item) {
            return item.name.indexOf(res) > -1;
          });
        } else {
          console.log("11111");
          this.getFoodList();
        }
      },
      clearSearch: function clearSearch(res) {
        this.getFoodList();
      },
      clear: function clear() {
        this.getFoodList();
      },
      closeList: function closeList() {
        this.cartShow = false;
      },

      // 价格优先
      sortPrice: function sortPrice() {
        var flag = this.currentPriceSort;
        console.log("1", this.currentPriceSort);
        this.foodList = this.foodList.sort(function (a, b) {
          return flag == 1 ? a.price > b.price : a.price < b.price;
        });
        this.priceSortIcon = flag == 1 ? 'icon-paixu-shuliangshengxu' : 'icon-paixu-shuliangjiangxu';
        this.currentPriceSort = flag == 1 ? 2 : 1;
        this.currentSortRule = 'price';

        console.log("2", this.currentPriceSort);
      },

      // 好评优先
      sortStar: function sortStar() {
        var flag = this.currentStarSort;
        this.foodList = this.foodList.sort(function (a, b) {
          return flag == 1 ? a.star < b.star : a.star > b.star;
        });
        this.starSortIcon = flag == 1 ? 'icon-dianzan' : 'icon-z-nolike';
        this.currentStarSort = flag == 1 ? 2 : 1;
        this.currentSortRule = 'star';
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(order, [{
    key: 'onLoad',
    value: function onLoad(options) {
      console.log(options, options.list);
      if (options.list) {} else {
        this.initPage();
      }
    }
  }, {
    key: 'onReady',
    value: function onReady() {}
  }, {
    key: 'initPage',
    value: function initPage() {
      this.getFoodList();
      this.getCat();
    }
  }, {
    key: 'search',
    value: function search() {
      wx.navigateTo({
        url: '/pages/searchTag'
      });
    }
  }, {
    key: 'getFoodList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = "http://localhost:8080/food/get_food";

                _wepy2.default.request(url).then(function (res) {
                  console.log("food=>>", res.data);
                  res.data.map(function (item) {
                    item.sum = 0;
                  });
                  _this2.foodList = res.data;
                  _this2.foodList = _this2.foodList.sort(function (a, b) {
                    return a.cat > b.cat;
                  });
                  // this.foodList = res.data.filter((item)=>{return item.cat == this.selectedId});
                  _this2.$apply();
                });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getFoodList() {
        return _ref2.apply(this, arguments);
      }

      return getFoodList;
    }()
  }, {
    key: 'getCat',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = "http://localhost:8080/food/get_food_cat";

                _wepy2.default.request(url).then(function (res) {
                  console.log("11", res);
                  _this3.categories.list = res.data;
                  _this3.categoriesList = res.data;
                  _this3.categories.selectedId = _this3.selectedId;
                  _this3.$apply();
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCat() {
        return _ref3.apply(this, arguments);
      }

      return getCat;
    }()
  }]);

  return order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIm9yZGVyIiwibWl4aW5zIiwiYmFzZSIsImh0dHAiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiU2lkZVRhYiIsImltYWdlTGlzdCIsImZvb2RMaXN0IiwiU2VhcmNoQmFyIiwiQ2FydCIsImljb24iLCJkYXRhIiwiaW5pdCIsImNhcnRTaG93Iiwic2VhcmNoVGV4dCIsImNhdGVnb3JpZXMiLCJjYXRlZ29yaWVzTGlzdCIsInNlbGVjdGVkSWQiLCJjaG9vc2VkTGlzdCIsImRlYWxMaXN0IiwiY3VycmVudFByaWNlU29ydCIsImN1cnJlbnRTdGFyU29ydCIsImN1cnJlbnRTb3J0UnVsZSIsInByaWNlU29ydEljb24iLCJzdGFyU29ydEljb24iLCJjb21wdXRlZCIsInNlbGVjdFZpZXciLCJ0ZXh0IiwibWV0aG9kcyIsInN3aXRjaFRhYiIsImNvbnNvbGUiLCJsb2ciLCJzZWFyY2hGb29kIiwicmVzIiwiZmlsdGVyIiwiaXRlbSIsIm5hbWUiLCJpbmRleE9mIiwiZ2V0Rm9vZExpc3QiLCJjbGVhclNlYXJjaCIsImNsZWFyIiwiY2xvc2VMaXN0Iiwic29ydFByaWNlIiwiZmxhZyIsInNvcnQiLCJhIiwiYiIsInByaWNlIiwic29ydFN0YXIiLCJzdGFyIiwiZXZlbnRzIiwib3B0aW9ucyIsImxpc3QiLCJpbml0UGFnZSIsImdldENhdCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIndlcHkiLCJyZXF1ZXN0IiwidGhlbiIsIm1hcCIsInN1bSIsImNhdCIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFT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aUJBTkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF4SStCTixlQUFLTyxJOztrQkFBbkJ0RSxLIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBTaWRlVGFiIGZyb20gJy4uL2NvbXBvbmVudHMvc2lkZV90YWInXG4gIGltcG9ydCBpbWFnZUxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9pbWFnZUxpc3QnXG4gIGltcG9ydCBTZWFyY2hCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hiYXInXG4gIGltcG9ydCBDYXJ0IGZyb20gJy4uL2NvbXBvbmVudHMvY2FydCdcbiAgaW1wb3J0IGJhc2UgZnJvbSAnLi4vbWl4aW5zL2Jhc2UnXG4gIGltcG9ydCBodHRwIGZyb20gJy4uL21peGlucy9odHRwJ1xuICBpbXBvcnQgZm9vZExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9mb29kTGlzdCdcbiAgaW1wb3J0IGljb24gZnJvbSAnLi4vY29tcG9uZW50cy9pY29uJ1xuXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3Mgb3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIG1peGlucyA9IFtiYXNlLCBodHRwXVxuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLppJDmnI3liqEnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJTaWRlVGFiXCI6e1widi1iaW5kOnRhYi5zeW5jXCI6XCJjYXRlZ29yaWVzXCJ9LFwiZm9vZExpc3RcIjp7XCJ2LWJpbmQ6dG9WaWV3LnN5bmNcIjpcInNlbGVjdFZpZXdcIixcImNsYXNzXCI6XCJnb29kcy1ib3hcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcImZvb2RMaXN0XCIsXCJ2LWJpbmQ6Y2hvb3NlTGlzdC5zeW5jXCI6XCJjaG9vc2VkTGlzdFwiLFwidi1iaW5kOmNhdExpc3Quc3luY1wiOlwiY2F0ZWdvcmllc0xpc3RcIixcInYtYmluZDpkZWFsTGlzdC5zeW5jXCI6XCJkZWFsTGlzdFwifSxcIlNlYXJjaEJhclwiOntcInR5cGVcIjpcInRhZ1wiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwbGFjZWhvbGRlci5vbmNlXCI6XCJzZWFyY2hUZXh0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJDYXJ0XCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwiY2FydFNob3dcIixcInYtYmluZDpjaG9vc2VMaXN0LnN5bmNcIjpcImNob29zZWRMaXN0XCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJmb29kTGlzdFwiLFwidi1iaW5kOmNhdExpc3Quc3luY1wiOlwiY2F0ZWdvcmllc0xpc3RcIixcInYtYmluZDpkZWFsTGlzdC5zeW5jXCI6XCJkZWFsTGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJTaWRlVGFiXCI6e1widi1vbjpjaGFuZ2VcIjpcInN3aXRjaFRhYlwifSxcIlNlYXJjaEJhclwiOntcInYtb246c2VhcmNoXCI6XCJzZWFyY2hGb29kXCIsXCJ2LW9uOmNsZWFyXCI6XCJjbGVhclNlYXJjaFwifSxcIkNhcnRcIjp7XCJ2LW9uOmNsZWFyXCI6XCJjbGVhclwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgU2lkZVRhYjpTaWRlVGFiLFxuICAgICAgaW1hZ2VMaXN0OmltYWdlTGlzdCxcbiAgICAgIGZvb2RMaXN0OmZvb2RMaXN0LFxuICAgICAgU2VhcmNoQmFyOlNlYXJjaEJhcixcbiAgICAgIENhcnQ6Q2FydCxcbiAgICAgIGljb246aWNvblxuICAgIH1cblxuICAgIG1peGlucyA9IFtdXG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5pdDp0cnVlLFxuICAgICAgY2FydFNob3c6ZmFsc2UsXG4gICAgICBzZWFyY2hUZXh0Oifor7fovpPlhaXllYblk4HlkI3np7AnLFxuICAgICAgY2F0ZWdvcmllczoge30sXG4gICAgICBjYXRlZ29yaWVzTGlzdDpbXSxcbiAgICAgIGZvb2RMaXN0OltdLFxuICAgICAgc2VsZWN0ZWRJZDoxLFxuICAgICAgY2hvb3NlZExpc3Q6W10sIC8v6LSt54mp6L2m6YCJ5Lit55qE6I+c5ZOBXG4gICAgICBkZWFsTGlzdDpbXSwgLy9kZWFsIGNhcnQgZGF0YVxuICAgICAgY3VycmVudFByaWNlU29ydDoxLFxuICAgICAgY3VycmVudFN0YXJTb3J0OjEsXG4gICAgICBjdXJyZW50U29ydFJ1bGU6JycsXG4gICAgICBwcmljZVNvcnRJY29uOidpY29uLXBhaXh1LXNodWxpYW5nc2hlbmd4dScsXG4gICAgICBzdGFyU29ydEljb246J2ljb24tZGlhbnphbidcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHNlbGVjdFZpZXcoKXtcbiAgICAgICAgbGV0IHRleHQgPSAgJ2EnK3RoaXMuc2VsZWN0ZWRJZCBcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8vIOeCueWHu+WIhuexu1xuICAgICAgc3dpdGNoVGFiKHNlbGVjdGVkSWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRJZClcbiAgICAgICAgdGhpcy5zZWxlY3RlZElkID0gc2VsZWN0ZWRJZDtcbiAgICAgIH0sXG4gICAgICBzZWFyY2hGb29kKHJlcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoXCIscmVzKTtcbiAgICAgICAgaWYocmVzKXtcbiAgICAgICAgICB0aGlzLmZvb2RMaXN0ID0gdGhpcy5mb29kTGlzdC5maWx0ZXIoKGl0ZW0pPT57XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lLmluZGV4T2YocmVzKSA+IC0xO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIjExMTExXCIpXG4gICAgICAgICAgdGhpcy5nZXRGb29kTGlzdCgpXG4gICAgICAgIH0gICAgIFxuICAgICAgfSxcbiAgICAgIGNsZWFyU2VhcmNoKHJlcyl7XG4gICAgICAgICAgdGhpcy5nZXRGb29kTGlzdCgpXG4gICAgICB9LFxuICAgICAgY2xlYXIoKXtcbiAgICAgICAgICB0aGlzLmdldEZvb2RMaXN0KClcbiAgICAgIH0sXG4gICAgICBjbG9zZUxpc3QoKXtcbiAgICAgICAgdGhpcy5jYXJ0U2hvdyA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIC8vIOS7t+agvOS8mOWFiFxuICAgICAgc29ydFByaWNlKCl7XG4gICAgICAgIGxldCBmbGFnID0gdGhpcy5jdXJyZW50UHJpY2VTb3J0IDtcbiAgICAgICAgY29uc29sZS5sb2coXCIxXCIsdGhpcy5jdXJyZW50UHJpY2VTb3J0KVxuICAgICAgICB0aGlzLmZvb2RMaXN0ID0gdGhpcy5mb29kTGlzdC5zb3J0KChhLGIpPT57XG4gICAgICAgICAgcmV0dXJuIGZsYWcgPT0gMSA/IGEucHJpY2UgPiBiLnByaWNlIDogYS5wcmljZSA8IGIucHJpY2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByaWNlU29ydEljb24gPSBmbGFnID09IDEgPyAnaWNvbi1wYWl4dS1zaHVsaWFuZ3NoZW5neHUnIDogJ2ljb24tcGFpeHUtc2h1bGlhbmdqaWFuZ3h1JyA7XG4gICAgICAgIHRoaXMuY3VycmVudFByaWNlU29ydCA9IChmbGFnID09IDEpID8gMiA6IDEgO1xuICAgICAgICB0aGlzLmN1cnJlbnRTb3J0UnVsZSA9ICdwcmljZSc7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCIyXCIsdGhpcy5jdXJyZW50UHJpY2VTb3J0KVxuXG4gICAgICB9LFxuICAgICAgLy8g5aW96K+E5LyY5YWIXG4gICAgICBzb3J0U3Rhcigpe1xuICAgICAgICBsZXQgZmxhZyA9IHRoaXMuY3VycmVudFN0YXJTb3J0IDtcbiAgICAgICAgdGhpcy5mb29kTGlzdCA9IHRoaXMuZm9vZExpc3Quc29ydCgoYSxiKT0+e1xuICAgICAgICAgIHJldHVybiBmbGFnID09IDEgPyBhLnN0YXIgPCBiLnN0YXIgOmEuc3RhciA+IGIuc3RhcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhclNvcnRJY29uID0gZmxhZyA9PSAxID8gJ2ljb24tZGlhbnphbicgOiAnaWNvbi16LW5vbGlrZScgO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGFyU29ydCA9IGZsYWcgPT0gMSA/IDIgOiAxIDtcbiAgICAgICAgdGhpcy5jdXJyZW50U29ydFJ1bGUgPSAnc3Rhcic7XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgY29uc29sZS5sb2cob3B0aW9ucyxvcHRpb25zLmxpc3QpXG4gICAgICBpZihvcHRpb25zLmxpc3Qpe1xuICAgICAgICBcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmluaXRQYWdlKClcbiAgICAgIH1cbiAgICB9XG4gICAgb25SZWFkeSgpIHtcbiAgICB9XG4gICAgaW5pdFBhZ2UoKXtcbiAgICAgIHRoaXMuZ2V0Rm9vZExpc3QoKTtcbiAgICAgIHRoaXMuZ2V0Q2F0KCk7XG4gICAgfVxuICAgIHNlYXJjaCgpe1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3NlYXJjaFRhZydcbiAgICAgICAgfSlcbiAgICB9XG4gICAgYXN5bmMgZ2V0Rm9vZExpc3QoKXtcbiAgICAgIHZhciB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9mb29kL2dldF9mb29kXCJcbiAgICAgIHdlcHkucmVxdWVzdCh1cmwpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZvb2Q9Pj5cIixyZXMuZGF0YSk7XG4gICAgICAgIHJlcy5kYXRhLm1hcCgoaXRlbSk9PntcbiAgICAgICAgICBpdGVtLnN1bSA9IDAgO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmZvb2RMaXN0ID0gcmVzLmRhdGFcbiAgICAgICAgdGhpcy5mb29kTGlzdCA9IHRoaXMuZm9vZExpc3Quc29ydCgoYSxiKT0+e1xuICAgICAgICAgIHJldHVybiBhLmNhdCA+IGIuY2F0O1xuICAgICAgICB9KVxuICAgICAgICAvLyB0aGlzLmZvb2RMaXN0ID0gcmVzLmRhdGEuZmlsdGVyKChpdGVtKT0+e3JldHVybiBpdGVtLmNhdCA9PSB0aGlzLnNlbGVjdGVkSWR9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgfVxuICAgIGFzeW5jIGdldENhdCgpe1xuICAgICAgdmFyIHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2Zvb2QvZ2V0X2Zvb2RfY2F0XCJcbiAgICAgIHdlcHkucmVxdWVzdCh1cmwpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIjExXCIscmVzKVxuICAgICAgICB0aGlzLmNhdGVnb3JpZXMubGlzdCA9IHJlcy5kYXRhO1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXNMaXN0ID0gcmVzLmRhdGEgO1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXMuc2VsZWN0ZWRJZCA9IHRoaXMuc2VsZWN0ZWRJZDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=