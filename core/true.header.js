;(function ($) {
  'use strict';

  $.TrueCore.components.TrueHeader = {

    /**
     * Base configuration.
     *
     * @var Object _baseConfig
     */
    _baseConfig: {
      headerFixMoment: 0,
      headerFixEffect: 'slide',
      breakpointsMap: {
        'md': 768,
        'sm': 576,
        'lg': 992,
        'xl': 1200
      }
    },

    /**
     * Initializtion of header.
     *
     * @param jQuery element
     *
     * @return jQuery
     */
    init: function( element ) {

      if( !element || element.length !== 1 || element.data('TrueHeader')) return;

      var self = this;

      this.element = element;
      this.config = $.extend(true, {}, this._baseConfig, element.data());

      this.observers = this._detectObservers();
      this.fixMediaDifference( this.element );
      this.element.data('TrueHeader', new TrueHeader(this.element, this.config, this.observers ) );

      $(window)
        .on('scroll.uHeader', function(e){

          element
            .data('TrueHeader')
            .notify();

        })
        .on('resize.uHeader', function(e){

          if( self.resizeTimeOutId ) clearTimeout( self.resizeTimeOutId );

          self.resizeTimeOutId = setTimeout( function(){

            element
              .data('TrueHeader')
              .checkViewport()
              .update();

          }, 100 );

        })
        .trigger('scroll.uHeader');

      return this.element;

    },

    /**
     *
     *
     * @param
     *
     * @return
     */
    _detectObservers: function() {

      if(!this.element || !this.element.length) return;

      var observers = {
        'xs': [],
        'sm': [],
        'md': [],
        'lg': [],
        'xl': []
      };

      /* ------------------------ xs -------------------------*/

        // Has Hidden Element
        if( this.element.hasClass('header--has-hidden-element') ) {
          observers['xs'].push(
            new TrueHeaderHasHiddenElement( this.element )
          );
        }

        // Sticky top

        if( this.element.hasClass('header--sticky-top') ) {

			$('html').css('padding-top', this.element.outerHeight() );
          if( this.element.hasClass('header--show-hide') ) {

            observers['xs'].push(
              new TrueHeaderMomentShowHideObserver( this.element )
            );

          }
          else if( this.element.hasClass('header--toggle-section') ) {

            observers['xs'].push(
              new TrueHeaderHideSectionObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo') ) {

            observers['xs'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance') ) {

            observers['xs'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Floating

        if( this.element.hasClass('header--floating') ) {

          observers['xs'].push(
            new TrueHeaderFloatingObserver( this.element )
          );

        }

        if( this.element.hasClass('header--invulnerable') ) {
          observers['xs'].push(
            new TrueHeaderWithoutBehaviorObserver( this.element )
          );
        }

        // Sticky bottom

        if( this.element.hasClass('header--sticky-bottom') ) {

          if(this.element.hasClass('header--change-appearance')) {
            observers['xs'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );
          }

          if( this.element.hasClass('header--change-logo') ) {

            observers['xs'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

        }

        // Abs top & Static

        if( this.element.hasClass('header--abs-top') || this.element.hasClass('header--static')) {

          if( this.element.hasClass('header--show-hide') ) {

            observers['xs'].push(
              new TrueHeaderShowHideObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo') ) {

            observers['xs'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance') ) {

            observers['xs'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Abs bottom & Abs top 2nd screen

        if( this.element.hasClass('header--abs-bottom') || this.element.hasClass('header--abs-top-2nd-screen') ) {

          observers['xs'].push(
            new TrueHeaderStickObserver( this.element )
          );

          if( this.element.hasClass('header--change-appearance') ) {

            observers['xs'].push(
              new TrueHeaderChangeAppearanceObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

          if( this.element.hasClass('header--change-logo') ) {

            observers['xs'].push(
              new TrueHeaderChangeLogoObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

        }

      /* ------------------------ sm -------------------------*/

        // Sticky top

        // Has Hidden Element
        if( this.element.hasClass('header--has-hidden-element--sm') ) {
          observers['sm'].push(
            new TrueHeaderHasHiddenElement( this.element )
          );
        }

        if( this.element.hasClass('header--sticky-top--sm') ) {

          if( this.element.hasClass('header--show-hide--sm') ) {

            observers['sm'].push(
              new TrueHeaderMomentShowHideObserver( this.element )
            );

          }
          else if( this.element.hasClass('header--toggle-section--sm') ) {

            observers['sm'].push(
              new TrueHeaderHideSectionObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo--sm') ) {

            observers['sm'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance--sm') ) {

            observers['sm'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Floating

        if( this.element.hasClass('header--floating--sm') ) {

          observers['sm'].push(
            new TrueHeaderFloatingObserver( this.element )
          );

        }

        if( this.element.hasClass('header--invulnerable--sm') ) {
          observers['sm'].push(
            new TrueHeaderWithoutBehaviorObserver( this.element )
          );
        }

        // Sticky bottom

        if( this.element.hasClass('header--sticky-bottom--sm') ) {

          if(this.element.hasClass('header--change-appearance--sm')) {
            observers['sm'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );
          }

          if( this.element.hasClass('header--change-logo--sm') ) {

            observers['sm'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

        }

        // Abs top & Static

        if( this.element.hasClass('header--abs-top--sm') || this.element.hasClass('header--static--sm')) {

          if( this.element.hasClass('header--show-hide--sm') ) {

            observers['sm'].push(
              new TrueHeaderShowHideObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo--sm') ) {

            observers['sm'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance--sm') ) {

            observers['sm'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Abs bottom & Abs top 2nd screen

        if( this.element.hasClass('header--abs-bottom--sm') || this.element.hasClass('header--abs-top-2nd-screen--sm') ) {

          observers['sm'].push(
            new TrueHeaderStickObserver( this.element )
          );

          if( this.element.hasClass('header--change-appearance--sm') ) {

            observers['sm'].push(
              new TrueHeaderChangeAppearanceObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

          if( this.element.hasClass('header--change-logo--sm') ) {

            observers['sm'].push(
              new TrueHeaderChangeLogoObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

        }

      /* ------------------------ md -------------------------*/

        // Has Hidden Element
        if( this.element.hasClass('header--has-hidden-element--md') ) {
          observers['md'].push(
            new TrueHeaderHasHiddenElement( this.element )
          );
        }

        // Sticky top

        if( this.element.hasClass('header--sticky-top--md') ) {

          if( this.element.hasClass('header--show-hide--md') ) {

            observers['md'].push(
              new TrueHeaderMomentShowHideObserver( this.element )
            );

          }
          else if( this.element.hasClass('header--toggle-section--md') ) {

            observers['md'].push(
              new TrueHeaderHideSectionObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo--md') ) {

            observers['md'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance--md') ) {

            observers['md'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Floating

        if( this.element.hasClass('header--floating--md') ) {

          observers['md'].push(
            new TrueHeaderFloatingObserver( this.element )
          );

        }

        if( this.element.hasClass('header--invulnerable--md') ) {
          observers['md'].push(
            new TrueHeaderWithoutBehaviorObserver( this.element )
          );
        }

        // Sticky bottom

        if( this.element.hasClass('header--sticky-bottom--md') ) {

          if(this.element.hasClass('header--change-appearance--md')) {
            observers['md'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );
          }

          if( this.element.hasClass('header--change-logo--md') ) {

            observers['md'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

        }

        // Abs top & Static

        if( this.element.hasClass('header--abs-top--md') || this.element.hasClass('header--static--md')) {

          if( this.element.hasClass('header--show-hide--md') ) {

            observers['md'].push(
              new TrueHeaderShowHideObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo--md') ) {

            observers['md'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance--md') ) {

            observers['md'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Abs bottom & Abs top 2nd screen

        if( this.element.hasClass('header--abs-bottom--md') || this.element.hasClass('header--abs-top-2nd-screen--md') ) {

          observers['md'].push(
            new TrueHeaderStickObserver( this.element )
          );

          if( this.element.hasClass('header--change-appearance--md') ) {

            observers['md'].push(
              new TrueHeaderChangeAppearanceObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

          if( this.element.hasClass('header--change-logo--md') ) {

            observers['md'].push(
              new TrueHeaderChangeLogoObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

        }


      /* ------------------------ lg -------------------------*/

        // Has Hidden Element
        if( this.element.hasClass('header--has-hidden-element--lg') ) {
          observers['lg'].push(
            new TrueHeaderHasHiddenElement( this.element )
          );
        }

        // Sticky top

        if( this.element.hasClass('header--sticky-top--lg') ) {

          if( this.element.hasClass('header--show-hide--lg') ) {

            observers['lg'].push(
              new TrueHeaderMomentShowHideObserver( this.element )
            );

          }
          else if( this.element.hasClass('header--toggle-section--lg') ) {

            observers['lg'].push(
              new TrueHeaderHideSectionObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo--lg') ) {

            observers['lg'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance--lg') ) {

            observers['lg'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Floating

        if( this.element.hasClass('header--floating--lg') ) {

          observers['lg'].push(
            new TrueHeaderFloatingObserver( this.element )
          );

        }

        if( this.element.hasClass('header--invulnerable--lg') ) {
          observers['lg'].push(
            new TrueHeaderWithoutBehaviorObserver( this.element )
          );
        }

        // Sticky bottom

        if( this.element.hasClass('header--sticky-bottom--lg') ) {

          if(this.element.hasClass('header--change-appearance--lg')) {
            observers['lg'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );
          }

          if( this.element.hasClass('header--change-logo--lg') ) {

            observers['lg'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

        }

        // Abs top & Static

        if( this.element.hasClass('header--abs-top--lg') || this.element.hasClass('header--static--lg')) {

          if( this.element.hasClass('header--show-hide--lg') ) {

            observers['lg'].push(
              new TrueHeaderShowHideObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo--lg') ) {

            observers['lg'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance--lg') ) {

            observers['lg'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Abs bottom & Abs top 2nd screen

        if( this.element.hasClass('header--abs-bottom--lg') || this.element.hasClass('header--abs-top-2nd-screen--lg') ) {

          observers['lg'].push(
            new TrueHeaderStickObserver( this.element )
          );

          if( this.element.hasClass('header--change-appearance--lg') ) {

            observers['lg'].push(
              new TrueHeaderChangeAppearanceObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

          if( this.element.hasClass('header--change-logo--lg') ) {

            observers['lg'].push(
              new TrueHeaderChangeLogoObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

        }

      /* ------------------------ xl -------------------------*/

        // Has Hidden Element
        if( this.element.hasClass('header--has-hidden-element--xl') ) {
          observers['xl'].push(
            new TrueHeaderHasHiddenElement( this.element )
          );
        }

        // Sticky top

        if( this.element.hasClass('header--sticky-top--xl') ) {

          if( this.element.hasClass('header--show-hide--xl') ) {

            observers['xl'].push(
              new TrueHeaderMomentShowHideObserver( this.element )
            );

          }
          else if( this.element.hasClass('header--toggle-section--xl') ) {

            observers['xl'].push(
              new TrueHeaderHideSectionObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo--xl') ) {

            observers['xl'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance--xl') ) {

            observers['xl'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Floating

        if( this.element.hasClass('header--floating--xl') ) {

          observers['xl'].push(
            new TrueHeaderFloatingObserver( this.element )
          );

        }

        // Sticky bottom

        if( this.element.hasClass('header--invulnerable--xl') ) {
          observers['xl'].push(
            new TrueHeaderWithoutBehaviorObserver( this.element )
          );
        }

        // Sticky bottom

        if( this.element.hasClass('header--sticky-bottom--xl') ) {

          if(this.element.hasClass('header--change-appearance--xl')) {
            observers['xl'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );
          }

          if( this.element.hasClass('header--change-logo--xl') ) {

            observers['xl'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

        }

        // Abs top & Static

        if( this.element.hasClass('header--abs-top--xl') || this.element.hasClass('header--static--xl')) {

          if( this.element.hasClass('header--show-hide--xl') ) {

            observers['xl'].push(
              new TrueHeaderShowHideObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-logo--xl') ) {

            observers['xl'].push(
              new TrueHeaderChangeLogoObserver( this.element )
            );

          }

          if( this.element.hasClass('header--change-appearance--xl') ) {

            observers['xl'].push(
              new TrueHeaderChangeAppearanceObserver( this.element )
            );

          }

        }

        // Abs bottom & Abs top 2nd screen

        if( this.element.hasClass('header--abs-bottom--xl') || this.element.hasClass('header--abs-top-2nd-screen--xl') ) {

          observers['xl'].push(
            new TrueHeaderStickObserver( this.element )
          );

          if( this.element.hasClass('header--change-appearance--xl') ) {

            observers['xl'].push(
              new TrueHeaderChangeAppearanceObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

          if( this.element.hasClass('header--change-logo--xl') ) {

            observers['xl'].push(
              new TrueHeaderChangeLogoObserver( this.element, {
                fixPointSelf: true
              } )
            );

          }

        }


      return observers;

    },

    /**
     *
     *
     * @param
     *
     * @return
     */
    fixMediaDifference: function(element) {

      if(!element || !element.length || !element.filter('[class*="header--side"]').length) return;

      var toggleable;

      if(element.hasClass('header--side-left--xl') || element.hasClass('header--side-right--xl')) {

        toggleable = element.find('.navbar-expand-xl');

        if(toggleable.length) {
          toggleable
            .removeClass('navbar-expand-xl')
            .addClass('navbar-expand-lg');
        }

      }
      else if(element.hasClass('header--side-left--lg') || element.hasClass('header--side-right--lg')) {

        toggleable = element.find('.navbar-expand-lg');

        if(toggleable.length) {
          toggleable
            .removeClass('navbar-expand-lg')
            .addClass('navbar-expand-md');
        }

      }
      else if(element.hasClass('header--side-left--md') || element.hasClass('header--side-right--md')) {

        toggleable = element.find('.navbar-expand-md');

        if(toggleable.length) {
          toggleable
            .removeClass('navbar-expand-md')
            .addClass('navbar-expand-sm');
        }

      }
      else if(element.hasClass('header--side-left--sm') || element.hasClass('header--side-right--sm')) {

        toggleable = element.find('.navbar-expand-sm');

        if(toggleable.length) {
          toggleable
            .removeClass('navbar-expand-sm')
            .addClass('navbar-expand');
        }

      }

    }

  }

  /**
   * TrueHeader constructor function.
   *
   * @param jQuery element
   * @param Object config
   * @param Object observers
   *
   * @return undefined
   */
  function TrueHeader( element, config, observers ) {

    if( !element || !element.length ) return;

    this.element = element;
    this.config = config;

    this.observers = observers && $.isPlainObject( observers ) ? observers : {};

    this.viewport = 'xs';
    this.checkViewport();

  }

  /**
   *
   *
   * @return Object
   */
  TrueHeader.prototype.checkViewport = function() {

    var $w = $(window);

    if( $w.width() > this.config.breakpointsMap['sm'] && this.observers['sm'].length ){
      this.prevViewport = this.viewport;
      this.viewport = 'sm';
      return this;
    }

    if( $w.width() > this.config.breakpointsMap['md'] && this.observers['md'].length ) {
      this.prevViewport = this.viewport;
      this.viewport = 'md';
      return this;
    }

    if( $w.width() > this.config.breakpointsMap['lg'] && this.observers['lg'].length ) {
      this.prevViewport = this.viewport;
      this.viewport = 'lg';
      return this;
    }

    if( $w.width() > this.config.breakpointsMap['xl'] && this.observers['xl'].length ) {
      this.prevViewport = this.viewport;
      this.viewport = 'xl';
      return this;
    }


    if(this.prevViewport) this.prevViewport = this.viewport;
    this.viewport = 'xs';


    return this;

  }

  /**
   * Notifies all observers.
   *
   * @return Object
   */
  TrueHeader.prototype.notify = function(){

    if( this.prevViewport ) {
      this.observers[this.prevViewport].forEach(function(observer){
        observer.destroy();
      });
      this.prevViewport = null;
    }

    this.observers[this.viewport].forEach(function(observer){
      observer.check();
    });

    return this;

  }

  /**
   * Reinit all header's observers.
   *
   * @return Object
   */
  TrueHeader.prototype.update = function() {

    // if( this.prevViewport ) {
    //   this.observers[this.prevViewport].forEach(function(observer){
    //     observer.destroy();
    //   });
    //   this.prevViewport = null;
    // }

    for(var viewport in this.observers) {

      this.observers[viewport].forEach(function(observer){
        observer.destroy();
      });

    }

    this.prevViewport = null;

    this.observers[this.viewport].forEach(function(observer){
      observer.reinit();
    });

    return this;

  }

  /**
   * Abstract constructor function for each observer.
   *
   * @param jQuery element
   *
   * @return Boolean|undefined
   */
  function HSAbstractObserver(element) {
    if( !element || !element.length ) return;

    this.element = element;
    this.defaultState = true;

    this.reinit = function() {

      this
        .destroy()
        .init()
        .check();
    }

    return true;
  }

  /**
   * Header's observer which is responsible for 'sticky' behavior.
   *
   * @param jQuery element
   */
  function TrueHeaderStickObserver( element ) {
    if( !HSAbstractObserver.call(this, element) ) return;

    this.init();

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderStickObserver.prototype.init = function() {
    this.defaultState = true;
    this.offset = this.element.offset().top;

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderStickObserver.prototype.destroy = function() {
    this.toDefaultState();

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderStickObserver.prototype.check = function() {

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if( docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if(docScrolled < this.offset && !this.defaultState){
      this.toDefaultState();
    }

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderStickObserver.prototype.changeState = function() {

    this.element.addClass('js-header-fix-moment');
    this.defaultState = !this.defaultState;

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderStickObserver.prototype.toDefaultState = function() {

    this.element.removeClass('js-header-fix-moment');
    this.defaultState = !this.defaultState;

    return this;

  }


  /**
   * Header's observer which is responsible for 'show/hide' behavior which is depended on scroll direction.
   *
   * @param jQuery element
   */
  function TrueHeaderMomentShowHideObserver( element ) {
    if( !HSAbstractObserver.call(this, element) ) return;

    this.init();
  }

  /**
   *
   *
   * @return Object
   */
  TrueHeaderMomentShowHideObserver.prototype.init = function() {
    this.direction = 'down';
    this.delta = 0;
    this.defaultState = true;

    this.offset = isFinite( this.element.data('header-fix-moment') ) && this.element.data('header-fix-moment') != 0 ? this.element.data('header-fix-moment') : 5;
    this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';

    return this;
  }

  /**
   *
   *
   * @return Object
   */
  TrueHeaderMomentShowHideObserver.prototype.destroy = function() {
    this.toDefaultState();

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  TrueHeaderMomentShowHideObserver.prototype.checkDirection = function() {

    if( $(window).scrollTop() > this.delta ) {
      this.direction = 'down';
    }
    else {
      this.direction = 'up';
    }

    this.delta = $(window).scrollTop();

    return this;

  }

  /**
   *
   *
   * @return Object
   */
  TrueHeaderMomentShowHideObserver.prototype.toDefaultState = function() {

    switch( this.effect ) {
      case 'slide' :
        this.element.removeClass('header--moved-up');
      break;

      case 'fade' :
        this.element.removeClass('header--faded');
      break;

      default:
        this.element.removeClass('header--invisible');
    }

    this.defaultState = !this.defaultState;

    return this;
  }

  /**
   *
   *
   * @return Object
   */
  TrueHeaderMomentShowHideObserver.prototype.changeState = function() {

    switch( this.effect ) {
      case 'slide' :
        this.element.addClass('header--moved-up');
      break;

      case 'fade' :
        this.element.addClass('header--faded');
      break;

      default:
        this.element.addClass('header--invisible');
    }

    this.defaultState = !this.defaultState;

    return this;
  }

  /**
   *
   *
   * @return Object
   */
  TrueHeaderMomentShowHideObserver.prototype.check = function() {

    var docScrolled = $(window).scrollTop();
    this.checkDirection();


    if( docScrolled >= this.offset && this.defaultState && this.direction == 'down' ) {
      this.changeState();
    }
    else if ( !this.defaultState && this.direction == 'up') {
      this.toDefaultState();
    }

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TrueHeaderShowHideObserver( element ) {
    if( !HSAbstractObserver.call(this, element) ) return;

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  TrueHeaderShowHideObserver.prototype.init = function() {
    if(!this.defaultState && $(window).scrollTop() > this.offset) return this;

    this.defaultState = true;
    this.transitionDuration = parseFloat( getComputedStyle( this.element.get(0) )['transition-duration'], 10 ) * 1000;

    this.offset = isFinite( this.element.data('header-fix-moment') ) && this.element.data('header-fix-moment') > this.element.outerHeight() ? this.element.data('header-fix-moment') : this.element.outerHeight() + 100;
    this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  TrueHeaderShowHideObserver.prototype.destroy = function() {
    if( !this.defaultState && $(window).scrollTop() > this.offset ) return this;

    this.element.removeClass('header--untransitioned');
    this._removeCap();

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderShowHideObserver.prototype._insertCap = function() {

    this.element.addClass('js-header-fix-moment header--untransitioned');

    if( this.element.hasClass('header--static') ) {

      $('html').css('padding-top', this.element.outerHeight() );

    }

    switch( this.effect ) {
      case 'fade' :
        this.element.addClass('header--faded');
      break;

      case 'slide' :
        this.element.addClass('header--moved-up');
      break;

      default :
        this.element.addClass('header--invisible')
    }

    this.capInserted = true;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderShowHideObserver.prototype._removeCap = function() {

    var self = this;

    this.element.removeClass('js-header-fix-moment');

    if( this.element.hasClass('header--static') ) {

      $('html').css('padding-top', 0 );

    }

    if(this.removeCapTimeOutId) clearTimeout(this.removeCapTimeOutId);

    this.removeCapTimeOutId = setTimeout(function() {
      self.element.removeClass('header--moved-up header--faded header--invisible');
    }, 10);

    this.capInserted = false;

  }


  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderShowHideObserver.prototype.check = function() {

    var $w = $(window);

    if( $w.scrollTop() > this.element.outerHeight() && !this.capInserted ) {
      this._insertCap();
    }
    else if($w.scrollTop() <= this.element.outerHeight() && this.capInserted) {
      this._removeCap();
    }

    if( $w.scrollTop() > this.offset && this.defaultState)  {
      this.changeState();
    }
    else if( $w.scrollTop() <= this.offset && !this.defaultState ) {
      this.toDefaultState();
    }



  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderShowHideObserver.prototype.changeState = function() {

    this.element.removeClass('header--untransitioned');

    if( this.animationTimeoutId ) clearTimeout( this.animationTimeoutId );

    switch( this.effect ) {
      case 'fade' :
        this.element.removeClass('header--faded');
      break;

      case 'slide' :
        this.element.removeClass('header--moved-up');
      break;

      default:
        this.element.removeClass('header--invisible');
    }

    this.defaultState = !this.defaultState;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderShowHideObserver.prototype.toDefaultState = function() {

    var self = this;

    this.animationTimeoutId = setTimeout(function(){
      self.element.addClass('header--untransitioned');
    }, this.transitionDuration );


    switch( this.effect ) {
      case 'fade' :
        this.element.addClass('header--faded');
      break;
      case 'slide' :
        this.element.addClass('header--moved-up');
      break;
      default:
        this.element.addClass('header--invisible');
    }

    this.defaultState = !this.defaultState;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TrueHeaderChangeLogoObserver( element, config ) {

    if( !HSAbstractObserver.call( this, element ) ) return;

    this.config = {
      fixPointSelf: false
    }

    if( config && $.isPlainObject(config) ) this.config = $.extend(true, {}, this.config, config);

    this.init();

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeLogoObserver.prototype.init = function() {

    if(this.element.hasClass('js-header-fix-moment')) {
      this.hasFixedClass = true;
      this.element.removeClass('js-header-fix-moment');
    }
    if( this.config.fixPointSelf ) {
      this.offset = this.element.offset().top;
    }
    else {
      this.offset = isFinite( this.element.data('header-fix-moment') ) ? this.element.data('header-fix-moment') : 0;
    }
    if(this.hasFixedClass) {
      this.hasFixedClass = false;
      this.element.addClass('js-header-fix-moment');
    }

    this.imgs = this.element.find('.header__logo-img');
    this.defaultState = true;

    this.mainLogo = this.imgs.filter('.header__logo-img--main');
    this.additionalLogo = this.imgs.not('.header__logo-img--main');

    if( !this.imgs.length ) return this;

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeLogoObserver.prototype.destroy = function() {
    this.toDefaultState();

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeLogoObserver.prototype.check = function() {

    var $w = $(window);

    if( !this.imgs.length ) return this;

    if( $w.scrollTop() > this.offset && this.defaultState) {
      this.changeState();
    }
    else if( $w.scrollTop() <= this.offset && !this.defaultState ) {
      this.toDefaultState();
    }

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeLogoObserver.prototype.changeState = function() {

    if(this.mainLogo.length) {
      this.mainLogo.removeClass('header__logo-img--main');
    }
    if(this.additionalLogo.length) {
      this.additionalLogo.addClass('header__logo-img--main');
    }

    this.defaultState = !this.defaultState;

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeLogoObserver.prototype.toDefaultState = function() {

    if(this.mainLogo.length) {
      this.mainLogo.addClass('header__logo-img--main');
    }
    if(this.additionalLogo.length) {
      this.additionalLogo.removeClass('header__logo-img--main');
    }

    this.defaultState = !this.defaultState;

    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TrueHeaderHideSectionObserver( element ) {
    if( !HSAbstractObserver.call(this, element) ) return;

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  TrueHeaderHideSectionObserver.prototype.init = function() {

    this.offset = isFinite( this.element.data('header-fix-moment') ) ? this.element.data('header-fix-moment') : 5;
    this.section = this.element.find('.header__section--hidden');
    this.defaultState = true;

    this.sectionHeight = this.section.length ? this.section.outerHeight() : 0;


    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHideSectionObserver.prototype.destroy = function() {

    if( this.section.length ) {

      this.element.css({
        'margin-top': 0
      });

    }

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHideSectionObserver.prototype.check = function() {

    if(!this.section.length) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if( docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if( docScrolled <= this.offset && !this.defaultState ) {
      this.toDefaultState();
    }

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHideSectionObserver.prototype.changeState = function() {

    var self = this;

    this.element.stop().animate({
      'margin-top': self.sectionHeight * -1 - 1 // last '-1' is a small fix
    });

    this.defaultState = !this.defaultState;
    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHideSectionObserver.prototype.toDefaultState = function() {

    this.element.stop().animate({
      'margin-top': 0
    });

    this.defaultState = !this.defaultState;
    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TrueHeaderChangeAppearanceObserver(element, config) {
    if( !HSAbstractObserver.call(this, element) ) return;

    this.config = {
      fixPointSelf: false
    }

    if( config && $.isPlainObject(config) ) this.config = $.extend(true, {}, this.config, config);

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeAppearanceObserver.prototype.init = function() {

    if(this.element.hasClass('js-header-fix-moment')) {
      this.hasFixedClass = true;
      this.element.removeClass('js-header-fix-moment');
    }

    if( this.config.fixPointSelf ) {
      this.offset = this.element.offset().top;
    }
    else {
      this.offset = isFinite( this.element.data('header-fix-moment') ) ? this.element.data('header-fix-moment') : 5;
    }

    if( this.hasFixedClass ) {
      this.hasFixedClass = false;
      this.element.addClass('js-header-fix-moment');
    }

    this.sections = this.element.find('[data-header-fix-moment-classes]');

    this.defaultState = true;


    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeAppearanceObserver.prototype.destroy = function() {

    this.toDefaultState();

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeAppearanceObserver.prototype.check = function() {

    if( !this.sections.length ) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if( docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if( docScrolled <= this.offset && !this.defaultState ) {
      this.toDefaultState();
    }

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeAppearanceObserver.prototype.changeState = function() {

    this.sections.each(function(i,el){

      var $this = $(el),
          classes = $this.data('header-fix-moment-classes'),
          exclude = $this.data('header-fix-moment-exclude');

      if( !classes && !exclude ) return;

      $this.addClass( classes + ' js-header-change-moment');
      $this.removeClass( exclude );

    });

    this.defaultState = !this.defaultState;
    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderChangeAppearanceObserver.prototype.toDefaultState = function() {

    this.sections.each(function(i,el){

      var $this = $(el),
          classes = $this.data('header-fix-moment-classes'),
          exclude = $this.data('header-fix-moment-exclude');

      if( !classes && !exclude ) return;

      $this.removeClass( classes + ' js-header-change-moment' );
      $this.addClass( exclude );

    });

    this.defaultState = !this.defaultState;
    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  function TrueHeaderHasHiddenElement(element, config) {
    if( !HSAbstractObserver.call(this, element) ) return;

    this.config = {
      animated: true
    }

    if( config && $.isPlainObject(config) ) this.config = $.extend(true, {}, this.config, config);

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHasHiddenElement.prototype.init = function() {
    this.offset = isFinite( this.element.data('header-fix-moment') ) ? this.element.data('header-fix-moment') : 5;
    this.elements = this.element.find('.header--hidden-element');
    this.defaultState = true;
    return this;
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHasHiddenElement.prototype.destroy = function() {

    this.toDefaultState();

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHasHiddenElement.prototype.check = function() {

    if( !this.elements.length ) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if( docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if( docScrolled <= this.offset && !this.defaultState ) {
      this.toDefaultState();
    }

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHasHiddenElement.prototype.changeState = function() {

    if(this.config.animated) {
      this.elements.stop().slideUp();
    }
    else {
      this.elements.hide();
    }

    this.defaultState = !this.defaultState;
    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderHasHiddenElement.prototype.toDefaultState = function() {

    if(this.config.animated) {
      this.elements.stop().slideDown();
    }
    else {
      this.elements.show();
    }

    this.defaultState = !this.defaultState;
    return this;

  }





  /**
   *
   *
   * @param
   *
   * @return
   */
  function TrueHeaderFloatingObserver(element, config) {
    if( !HSAbstractObserver.call(this, element) ) return;

    this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this.config, config) : {};
    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderFloatingObserver.prototype.init = function() {

    this.offset = this.element.offset().top;
    this.sections = this.element.find('.header__section');

    this.defaultState = true;

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderFloatingObserver.prototype.destroy = function() {

    this.toDefaultState();

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderFloatingObserver.prototype.check = function() {

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if( docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if( docScrolled <= this.offset && !this.defaultState ) {
      this.toDefaultState();
    }

    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderFloatingObserver.prototype.changeState = function() {

    this.element
        .addClass('js-header-fix-moment')
        .addClass( this.element.data('header-fix-moment-classes') )
        .removeClass( this.element.data('header-fix-moment-exclude') );

    if( this.sections.length ) {
      this.sections.each(function(i, el){

        var $section = $(el);

        $section.addClass( $section.data('header-fix-moment-classes') )
                .removeClass( $section.data('header-fix-moment-exclude') );

      });
    }

    this.defaultState = !this.defaultState;
    return this;

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  TrueHeaderFloatingObserver.prototype.toDefaultState = function() {

    this.element
        .removeClass('js-header-fix-moment')
        .removeClass( this.element.data('header-fix-moment-classes') )
        .addClass( this.element.data('header-fix-moment-exclude') );

    if( this.sections.length ) {
      this.sections.each(function(i, el){

        var $section = $(el);

        $section.removeClass( $section.data('header-fix-moment-classes') )
                .addClass( $section.data('header-fix-moment-exclude') );

      });
    }

    this.defaultState = !this.defaultState;
    return this;

  }


  /**
   *
   *
   * @param
   *
   * @return
   */
  function TrueHeaderWithoutBehaviorObserver( element ) { if( !HSAbstractObserver.call(this, element) ) return; }

  TrueHeaderWithoutBehaviorObserver.prototype.check = function() {
    return this;
  }

  TrueHeaderWithoutBehaviorObserver.prototype.init = function() {
    return this;
  }

  TrueHeaderWithoutBehaviorObserver.prototype.destroy = function() {
    return this;
  }

  TrueHeaderWithoutBehaviorObserver.prototype.changeState = function() {
    return this;
  }

  TrueHeaderWithoutBehaviorObserver.prototype.toDefaultState = function() {
    return this;
  }


})(jQuery);