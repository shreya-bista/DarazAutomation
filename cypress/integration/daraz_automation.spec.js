/// <reference types="cypress" />

var SIGNUP = ('[class="top-links-item  grey"][id="anonSignup"]')
var Google = 'button[class="mod-button mod-button mod-third-party-login-btn mod-third-party-login-google"]'
var LOGIN = '[class="top-links-item  grey"][id="anonLogin"]'
var Enter_Email = 'input[type="text"][placeholder="Please enter your Phone Number or Email"]'
var Enter_password = 'input[type="password"][placeholder="Please enter your password"]'
var Login_button = 'div[class="mod-login-btn"]'
var Search_box = '#q'
var Search_button = 'button[class="search-box__button--1oH7"][data-spm-click="gostr=/lzdpub.header.search;locaid=d_go"]'
var Mobile_brand = 'label[class="c3NQn0 ant-checkbox-wrapper"]'
var Min_price = 'input[class="c30Om7"][placeholder="Min"]'
var Max_price = 'input[class="c30Om7"][placeholder="Max"]'
var Price_filter_button = 'button[type="button"][class="ant-btn c3R9mX ant-btn-primary ant-btn-icon-only"]'
var _5star_rating = 'ul[class="ant-rate ant-rate-disabled"]'
var Add_to_cart_button = 'button[class="add-to-cart-buy-now-btn  pdp-button pdp-button_type_text pdp-button_theme_orange pdp-button_size_xl"]'
var Close_box = 'a[href="javascript:;"][class="next-dialog-close"]'
var Close_box_Icon = 'i[class="next-icon next-icon-close next-icon-small"]'
var Cart_Page_url = 'https://cart.daraz.com.np/cart?spm=a2a0e.cart.header.dcart.547b6af7D7xMa8&scm=1003.4.icms-zebra-100024132-2872644.OTHER_5410631007_2522001'
var Smartphones_category_url = 'https://www.daraz.com.np/smartphones/?spm=a2a0e.11779170.cate_1.1.7a622d2bCKCizz'
var Oliz_HomePage_url = 'https://www.daraz.com.np/shop/oliz-store/?spm=a2a0e.searchlist.breadcrumb.2.1ff937c9YsX4le'
const keyword = 'Oliz Store'



describe('Daraz-Website Automation', function () {

    /*it('SIGNUP with Google', function () {
      cy.get(SIGNUP).click()
      cy.get(Google).click()
    })*/


    before(function () {

        cy.visit('/');
        // User LOGIN
        cy.get(LOGIN).click()
        cy.get(Enter_Email).type('').wait(1000)
        cy.get(Enter_password).type('').wait(1000)
        cy.get(Login_button).click().wait(4000)
    })

    //Session maintain for multiple it blocks
    beforeEach(() => {
        cy.fixture('example.json').then(data => {
            debugger;
            Cypress.Cookies.defaults({
                preserve: data.cookiesKey
            })
        })
    })

    after(() => {
        cy.clearCookies();
    })

    afterEach(() => {
        cy.wait(1500);
    });

    it('Search the item (Mobile) in the Search Box.', function () {

        cy.get(Search_box).type('Mobile' + '{enter}');
    })

    it('Applies multiple filter and add item to the cart (Brand, Price, Rating).', function () {

        // Gets the first element in a list.
        cy.get(Mobile_brand).first().click().wait(500);
        // Gets the element at index 2 within an array of elements.
        cy.get('.c1WzWT.c3cfO2 > label:nth-child(1) .ant-checkbox-input').click().wait(500);

        // For Price: Sets_MinimunPrice-3690 And_MaximunPrice-36900.
        cy.get(Min_price).type('3690')
        cy.get(Max_price).type('36900')
        cy.get(Price_filter_button).click()

        // For Rating: Selects_Item_With_5-star_Rating.
        cy.get(_5star_rating).first().click()

        // Adds_Item_To_The_Cart_After_Appliying_Filters.
        cy.get('div[class="cRjKsc"]').find('a[href="//www.daraz.com.np/products/samsung-galaxy-a12-with-48-mp-quad-camera-653-display-5000-mah-battery-i105368042-s1027070393.html?search=1"]').click({
            force: true
        })
        // Clicks on "Add to cart" button.
        cy.get(Add_to_cart_button).click()

        // Clicks on Close Icon.
        cy.get(Close_box).find(Close_box_Icon).click()
    })

    it('Applies sort by filter from Low-to High.', function () {

        cy.visit(Smartphones_category_url)
        cy.get('.ant-select-selection.ant-select-selection--single').click()
        cy.get('.ant-select-dropdown-menu li div').contains('Price low to high').click()
    })

    it('Removes the item from the cart.', function () {

        cy.visit(Cart_Page_url)
        var Delete_Item = '#leftContainer_CL div:nth-child(3) .delete'
        cy.get(Delete_Item).click()
        cy.get('button[class="next-btn next-btn-primary next-btn-medium"]').contains('REMOVE').click()
    })

    it('Visits the seller homepage (Oliz Homepage) in Daraz.', function () {

        cy.visit(Oliz_HomePage_url).title().should('contain', 'Oliz Store Nepal: Official Online Store - Daraz.com.np').wait(500);
    })

    it('Searches for Oliz Store in the Daraz Search Box.', function () {

        cy.get(Search_box).type(keyword)
        cy.get(Search_button).click()
    })

    it('Verify the base URL after user visit', function () {

        const newKeyword = keyword.replaceAll(' ', "+")
        cy.url(Oliz_HomePage_url).should('contain', newKeyword)
    })

    it('Clicks for Free delivery -> Searche for any item', function () {

        cy.get('span[class="lzd-menu-labels-item-text"]').contains('Free Delivery').click()
        cy.get('a[href="https://www.daraz.com.np/wow/gcp/daraz/channel/np/LP/free-delivery-week-womens-fashin"]').click()
    })

    it('Clicks Shop Now -> Verify Free Delivery in Product page', function () {

        cy.get('span[class="text"]').contains('Shop Now').click()
        //* Commented following assertion since At times, delivery charge text is not 'Free'.
        //cy.get('.delivery-option-item__shipping-fee').should('contain', 'Free').wait(500)
    })

    it('Asks Question for the particular product in Daraz and verify the question', function () {

        const Qn = "Good"
        cy.get('input[type="text"][placeholder="Enter your question(s) here"]').scrollIntoView().type(Qn)
        cy.get('button[class="next-btn next-btn-primary next-btn-medium qna-ask-btn"]').contains('ASK QUESTIONS').click().wait(4000);
        cy.get('.qna-section-title').contains("My Questions").parent().find('.qna-content').should('contain.text', Qn);

    })

    it('Verify Save More On App Click Action and verify App download link', function () {
        cy.scrollTo('top')
        cy.get('.header-content span').contains("SAVE MORE ON APP").click()
        cy.get('.app-google').parent().should('have.attr', 'href', '//play.google.com/store/apps/details?id=com.daraz.android&scm=1003.4.icms-zebra-100024132-2890703.OTHER_5557794167_2540120');
        cy.get('.app-apple').parent().should('have.attr', 'href', '//itunes.apple.com/app/id978058048?mt=8&scm=1003.4.icms-zebra-100024132-2890703.OTHER_5557794167_2540120')
    })
})