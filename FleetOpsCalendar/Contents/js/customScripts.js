/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function (jQuery) {

    jQuery.hotkeys = {
        version: "0.8",

        specialKeys: {
            8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
            20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
            37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
            96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
            104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111: "/",
            112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
            120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
        },
        shiftNums: {
            "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
            "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
            ".": ">", "/": "?", "\\": "|"
        }
    };

    function keyHandler(handleObj) {
        // Only care when a possible input has been specified
        if (typeof handleObj.data !== "string") {
            return;
        }

        var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");

        handleObj.handler = function (event) {
            // Don't fire in text-accepting inputs that we didn't directly bind to
            if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) ||
				 event.target.type === "text")) {
                return;
            }

            // Keypress represents characters, not special keys
            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
				character = String.fromCharCode(event.which).toLowerCase(),
				key, modif = "", possible = {};

            // check combinations (alt|ctrl|shift+anything)
            if (event.altKey && special !== "alt") {
                modif += "alt+";
            }

            if (event.ctrlKey && special !== "ctrl") {
                modif += "ctrl+";
            }

            // TODO: Need to make sure this works consistently across platforms
            if (event.metaKey && !event.ctrlKey && special !== "meta") {
                modif += "meta+";
            }

            if (event.shiftKey && special !== "shift") {
                modif += "shift+";
            }

            if (special) {
                possible[modif + special] = true;

            } else {
                possible[modif + character] = true;
                possible[modif + jQuery.hotkeys.shiftNums[character]] = true;

                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                if (modif === "shift+") {
                    possible[jQuery.hotkeys.shiftNums[character]] = true;
                }
            }

            for (var i = 0, l = keys.length; i < l; i++) {
                if (possible[keys[i]]) {
                    return origHandler.apply(this, arguments);
                }
            }
        };
    }

    jQuery.each(["keydown", "keyup", "keypress"], function () {
        jQuery.event.special[this] = { add: keyHandler };
    });

})(jQuery);

!function ($) {

    "use strict"; // jshint ;_;

    /* MODAL CLASS DEFINITION
	* ====================== */

    var Modal = function (element, options) {
        this.init(element, options);
    }

    Modal.prototype = {

        constructor: Modal,

        init: function (element, options) {
            this.options = options;

            this.$element = $(element)
				.delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));

            this.options.remote && this.$element.find('.modal-body').load(this.options.remote);

            var manager = typeof this.options.manager === 'function' ?
				this.options.manager.call(this) : this.options.manager;

            manager = manager.appendModal ?
                manager : $(manager).modalmanager().data('modalmanager');

            manager.appendModal(this);
        },

        toggle: function () {
            return this[!this.isShown ? 'show' : 'hide']();
        },

        show: function () {
            var that = this,
				e = $.Event('show');

            if (this.isShown) return;

            this.$element.triggerHandler(e);

            if (e.isDefaultPrevented()) return;

            if (this.options.width) {
                this.$element.css('width', this.options.width);

                var that = this;
                this.$element.css('margin-left', function () {
                    if (/%/ig.test(that.options.width)) {
                        return -(parseInt(that.options.width) / 2) + '%';
                    } else {
                        return -($(this).width() / 2) + 'px';
                    }
                });
            }

            var prop = this.options.height ? 'height' : 'max-height';

            var value = this.options.height || this.options.maxHeight;

            if (value) {
                this.$element.find('.modal-body')
					.css('overflow', 'auto')
					.css(prop, value);
            }

            this.escape();

            this.tab();

            this.options.loading && this.loading();
        },

        hide: function (e) {
            e && e.preventDefault();

            e = $.Event('hide');

            this.$element.triggerHandler(e);

            if (!this.isShown || e.isDefaultPrevented()) return (this.isShown = false);

            this.isShown = false;

            this.escape();

            this.tab();

            this.isLoading && this.loading();

            $(document).off('focusin.modal');

            this.$element
				.removeClass('in')
				.removeClass('animated')
				.removeClass(this.options.attentionAnimation)
				.removeClass('modal-overflow')
				.attr('aria-hidden', true);

            $.support.transition && this.$element.hasClass('fade') ?
				this.hideWithTransition() :
				this.hideModal();
        },

        tab: function () {
            var that = this;

            if (this.isShown && this.options.consumeTab) {
                this.$element.on('keydown.tabindex.modal', '[data-tabindex]', function (e) {
                    if (e.keyCode && e.keyCode == 9) {
                        var $next = $(this),
				        	$rollover = $(this);

                        that.$element.find('[data-tabindex]:enabled:not([readonly])').each(function (e) {
                            if (!e.shiftKey) {
                                $next = $next.data('tabindex') < $(this).data('tabindex') ?
				              		$next = $(this) :
				              		$rollover = $(this);
                            } else {
                                $next = $next.data('tabindex') > $(this).data('tabindex') ?
				              		$next = $(this) :
				             		$rollover = $(this);
                            }
                        });

                        $next[0] !== $(this)[0] ?
			          		$next.focus() : $rollover.focus();

                        e.preventDefault();

                    }
                });
            } else if (!this.isShown) {
                this.$element.off('keydown.tabindex.modal');
            }
        },

        escape: function () {
            var that = this;
            if (this.isShown && this.options.keyboard) {
                if (!this.$element.attr('tabindex')) this.$element.attr('tabindex', -1);

                this.$element.on('keyup.dismiss.modal', function (e) {
                    e.which == 27 && that.hide();
                });
            } else if (!this.isShown) {
                this.$element.off('keyup.dismiss.modal')
            }
        },

        hideWithTransition: function () {
            var that = this
				, timeout = setTimeout(function () {
				    that.$element.off($.support.transition.end)
				    that.hideModal()
				}, 500);

            this.$element.one($.support.transition.end, function () {
                clearTimeout(timeout)
                that.hideModal()
            });
        },

        hideModal: function () {
            this.$element
				.hide()
				.triggerHandler('hidden');


            var prop = this.options.height ? 'height' : 'max-height';
            var value = this.options.height || this.options.maxHeight;

            if (value) {
                this.$element.find('.modal-body')
					.css('overflow', '')
					.css(prop, '');
            }

        },

        removeLoading: function () {
            this.$loading.remove();
            this.$loading = null;
            this.isLoading = false;
        },

        loading: function (callback) {
            callback = callback || function () { };

            var animate = this.$element.hasClass('fade') ? 'fade' : '';

            if (!this.isLoading) {
                var doAnimate = $.support.transition && animate;

                this.$loading = $('<div class="loading-mask ' + animate + '">')
					.append(this.options.spinner)
					.appendTo(this.$element);

                if (doAnimate) this.$loading[0].offsetWidth // force reflow	

                this.$loading.addClass('in')

                this.isLoading = true;

                doAnimate ?
					this.$loading.one($.support.transition.end, callback) :
					callback();

            } else if (this.isLoading && this.$loading) {
                this.$loading.removeClass('in');

                var that = this;
                $.support.transition && this.$element.hasClass('fade') ?
					this.$loading.one($.support.transition.end, function () { that.removeLoading() }) :
					that.removeLoading();

            } else if (callback) {
                callback(this.isLoading);
            }
        },

        focus: function () {
            var $focusElem = this.$element.find(this.options.focusOn);

            $focusElem = $focusElem.length ? $focusElem : this.$element;

            $focusElem.focus();
        },

        attention: function () {
            // NOTE: transitionEnd with keyframes causes odd behaviour

            if (this.options.attentionAnimation) {
                this.$element
					.removeClass('animated')
					.removeClass(this.options.attentionAnimation);

                var that = this;

                setTimeout(function () {
                    that.$element
						.addClass('animated')
						.addClass(that.options.attentionAnimation);
                }, 0);
            }


            this.focus();
        },


        destroy: function () {
            var e = $.Event('destroy');
            this.$element.triggerHandler(e);
            if (e.isDefaultPrevented()) return;

            this.teardown();
        },

        teardown: function () {
            if (!this.$parent.length) {
                this.$element.remove();
                this.$element = null;
                return;
            }

            if (this.$parent !== this.$element.parent()) {
                this.$element.appendTo(this.$parent);
            }

            this.$element.off('.modal');
            this.$element.removeData('modal');
            this.$element
				.removeClass('in')
				.attr('aria-hidden', true);
        }
    }


    /* MODAL PLUGIN DEFINITION
	* ======================= */

    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this),
				data = $this.data('modal'),
				options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option]()
            else if (options.show) data.show()
        })
    }

    $.fn.modal.defaults = {
        keyboard: true,
        backdrop: true,
        loading: false,
        show: true,
        width: null,
        height: null,
        maxHeight: null,
        modalOverflow: false,
        consumeTab: true,
        focusOn: null,
        attentionAnimation: 'shake',
        manager: 'body',
        spinner: '<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>'
    }

    $.fn.modal.Constructor = Modal


    /* MODAL DATA-API
	* ============== */

    $(function () {
        $(document).off('.modal').on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
            var $this = $(this),
				href = $this.attr('href'),
				$target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))), //strip for ie7 
				option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

            e.preventDefault();
            $target
				.modal(option)
				.one('hide', function () {
				    $this.focus();
				})
        });
    });

}(window.jQuery);

!function ($) {

    "use strict"; // jshint ;_;

    /* MODAL MANAGER CLASS DEFINITION
	* ====================== */

    var ModalManager = function (element, options) {
        this.init(element, options);
    }

    ModalManager.prototype = {

        constructor: ModalManager,

        init: function (element, options) {
            this.$element = $(element);
            this.options = $.extend({}, $.fn.modalmanager.defaults, this.$element.data(), typeof options == 'object' && options);
            this.stack = [];
            this.backdropCount = 0;
        },

        createModal: function (element, options) {
            $(element).modal($.extend({ manager: this }, options));
        },

        appendModal: function (modal) {
            this.stack.push(modal);

            var that = this;

            modal.$element.on('show.modalmanager', targetIsSelf(function (e) {
                modal.isShown = true;

                var transition = $.support.transition && modal.$element.hasClass('fade');

                that.$element
					.toggleClass('modal-open', that.hasOpenModal())
					.toggleClass('page-overflow', $(window).height() < that.$element.height());

                modal.$parent = modal.$element.parent();

                modal.$container = that.createContainer(modal);

                modal.$element.appendTo(modal.$container);

                var modalOverflow = $(window).height() < modal.$element.height() || modal.options.modalOverflow;

                that.backdrop(modal, function () {

                    modal.$element.show();

                    if (transition) {
                        modal.$element[0].style.display = 'run-in';
                        modal.$element[0].offsetWidth;
                        modal.$element.one($.support.transition.end, function () { modal.$element[0].style.display = 'block' });
                    }

                    modal.$element
						.toggleClass('modal-overflow', modalOverflow)
						.css('margin-top', modalOverflow ? 0 : 0 - modal.$element.height() / 2)
						.addClass('in')
						.attr('aria-hidden', false);

                    var complete = function () {
                        that.setFocus();
                        modal.$element.triggerHandler('shown');
                    }

                    transition ?
						modal.$element.one($.support.transition.end, complete) :
						complete();
                });
            }));

            modal.$element.on('hidden.modalmanager', targetIsSelf(function (e) {

                that.backdrop(modal);

                if (modal.$backdrop) {
                    $.support.transition && modal.$element.hasClass('fade') ?
						modal.$backdrop.one($.support.transition.end, function () { that.destroyModal(modal) }) :
						that.destroyModal(modal);
                } else {
                    that.destroyModal(modal);
                }

            }));

            modal.$element.on('destroy.modalmanager', targetIsSelf(function (e) {
                that.removeModal(modal);
            }));
        },

        destroyModal: function (modal) {

            modal.destroy();

            var hasOpenModal = this.hasOpenModal();

            this.$element.toggleClass('modal-open', hasOpenModal);

            if (!hasOpenModal) {
                this.$element.removeClass('page-overflow');
            }

            this.removeContainer(modal);

            this.setFocus();
        },

        hasOpenModal: function () {
            for (var i = 0; i < this.stack.length; i++) {
                if (this.stack[i].isShown) return true;
            }

            return false;
        },

        setFocus: function () {
            var topModal;

            for (var i = 0; i < this.stack.length; i++) {
                if (this.stack[i].isShown) topModal = this.stack[i];
            }

            if (!topModal) return;

            topModal.focus();

        },

        removeModal: function (modal) {
            modal.$element.off('.modalmanager');
            if (modal.$backdrop) this.removeBackdrop.call(modal);
            this.stack.splice(this.getIndexOfModal(modal), 1);
        },

        getModalAt: function (index) {
            return this.stack[index];
        },

        getIndexOfModal: function (modal) {
            for (var i = 0; i < this.stack.length; i++) {
                if (modal === this.stack[i]) return i;
            }
        },

        removeBackdrop: function (modal) {
            modal.$backdrop.remove();
            modal.$backdrop = null;
        },

        createBackdrop: function (animate) {
            var $backdrop;

            if (!this.isLoading) {
                $backdrop = $('<div class="modal-backdrop ' + animate + '" />')
					.appendTo(this.$element);

            } else {
                $backdrop = this.$loading;
                $backdrop.off('.modalmanager');
                this.$spinner.remove();
                this.isLoading = false;
                this.$loading = this.$spinner = null;
            }

            return $backdrop
        },

        removeContainer: function (modal) {
            modal.$container.remove();
            modal.$container = null;
        },

        createContainer: function (modal) {
            var $container;

            $container = $('<div class="modal-scrollable">')
				.css('z-index', getzIndex('modal',
					modal ? this.getIndexOfModal(modal) : this.stack.length))
				.appendTo(this.$element);

            if (modal && modal.options.backdrop != 'static') {
                $container.on('click.modal', targetIsSelf(function (e) {
                    modal.hide();
                }));
            } else if (modal) {
                $container.on('click.modal', targetIsSelf(function (e) {
                    modal.attention();
                }));
            }

            return $container;

        },

        backdrop: function (modal, callback) {
            var animate = modal.$element.hasClass('fade') ? 'fade' : '',
				showBackdrop = modal.options.backdrop &&
					this.backdropCount < this.options.backdropLimit;

            if (modal.isShown && showBackdrop) {
                var doAnimate = $.support.transition && animate && !this.isLoading;


                modal.$backdrop = this.createBackdrop(animate);

                modal.$backdrop.css('z-index', getzIndex('backdrop', this.getIndexOfModal(modal)))

                if (doAnimate) modal.$backdrop[0].offsetWidth // force reflow

                modal.$backdrop.addClass('in')

                this.backdropCount += 1;

                doAnimate ?
					modal.$backdrop.one($.support.transition.end, callback) :
					callback();

            } else if (!modal.isShown && modal.$backdrop) {
                modal.$backdrop.removeClass('in');

                this.backdropCount -= 1;

                var that = this;

                $.support.transition && modal.$element.hasClass('fade') ?
					modal.$backdrop.one($.support.transition.end, function () { that.removeBackdrop(modal) }) :
					that.removeBackdrop(modal);

            } else if (callback) {
                callback();
            }
        },

        removeLoading: function () {
            this.$loading && this.$loading.remove();
            this.$loading = null;
            this.isLoading = false;
        },

        loading: function (callback) {
            callback = callback || function () { };

            this.$element
				.toggleClass('modal-open', !this.isLoading || this.hasOpenModal())
				.toggleClass('page-overflow', $(window).height() < this.$element.height());

            if (!this.isLoading) {

                this.$loading = this.createBackdrop('fade');

                this.$loading[0].offsetWidth // force reflow	

                this.$loading
					.css('z-index', getzIndex('backdrop', this.stack.length))
					.addClass('in');

                var $spinner = $(this.options.spinner)
					.css('z-index', getzIndex('modal', this.stack.length))
					.appendTo(this.$element)
					.addClass('in');

                this.$spinner = $(this.createContainer())
					.append($spinner)
					.on('click.modalmanager', $.proxy(this.loading, this));

                this.isLoading = true;

                $.support.transition ?
				this.$loading.one($.support.transition.end, callback) :
				callback();

            } else if (this.isLoading && this.$loading) {
                this.$loading.removeClass('in');

                if (this.$spinner) this.$spinner.remove();

                var that = this;
                $.support.transition ?
					this.$loading.one($.support.transition.end, function () { that.removeLoading() }) :
					that.removeLoading();

            } else if (callback) {
                callback(this.isLoading);
            }
        }
    }

    /* PRIVATE METHODS
	* ======================= */

    // computes and caches the zindexes
    var getzIndex = (function () {
        var zIndexFactor,
			baseIndex = {};

        return function (type, pos) {

            if (typeof zIndexFactor === 'undefined') {
                var $baseModal = $('<div class="modal hide" />').appendTo('body'),
					$baseBackdrop = $('<div class="modal-backdrop hide" />').appendTo('body');

                baseIndex['modal'] = +$baseModal.css('z-index'),
				baseIndex['backdrop'] = +$baseBackdrop.css('z-index'),
				zIndexFactor = baseIndex['modal'] - baseIndex['backdrop'];

                $baseModal.remove();
                $baseBackdrop.remove();
                $baseBackdrop = $baseModal = null;
            }

            return baseIndex[type] + (zIndexFactor * pos);

        }
    }())

    // make sure the event target is the modal itself in order to prevent 
    // other components such as tabsfrom triggering the modal manager. 
    // if Boostsrap namespaced events, this would not be needed.
    function targetIsSelf(callback) {
        return function (e) {
            if (this === e.target) {
                return callback.apply(this, arguments);
            }
        }
    }


    /* MODAL MANAGER PLUGIN DEFINITION
	* ======================= */

    $.fn.modalmanager = function (option) {
        return this.each(function () {
            var $this = $(this),
				data = $this.data('modalmanager');

            if (!data) $this.data('modalmanager', (data = new ModalManager(this, option)))
            if (typeof option === 'string') data[option]()
        })
    }

    $.fn.modalmanager.defaults = {
        backdropLimit: 999,
        spinner: '<div class="loading-spinner fade" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>'
    }

    $.fn.modalmanager.Constructor = ModalManager

}(jQuery);

/*
 * jQuery idleTimer plugin
 * version 0.8.092209
 * by Paul Irish. 
 *   http://github.com/paulirish/yui-misc/tree/
 * MIT license
 
 * adapted from YUI idle timer by nzakas:
 *   http://github.com/nzakas/yui-misc/
 
 
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function ($) {

    $.idleTimer = function f(newTimeout) {

        //$.idleTimer.tId = -1     //timeout ID

        var idle = false,        //indicates if the user is idle
            enabled = true,        //indicates if the idle timer is enabled
            timeout = 30000,        //the amount of time (ms) before the user is considered idle
            events = 'mousemove keydown DOMMouseScroll mousewheel mousedown', // activity is one of these events
          //f.olddate = undefined, // olddate used for getElapsedTime. stored on the function

        /* (intentionally not documented)
         * Toggles the idle state and fires an appropriate event.
         * @return {void}
         */
        toggleIdleState = function () {

            //toggle the state
            idle = !idle;

            // reset timeout counter
            f.olddate = +new Date;

            //fire appropriate event
            $(document).trigger($.data(document, 'idleTimer', idle ? "idle" : "active") + '.idleTimer');
        },

        /**
         * Stops the idle timer. This removes appropriate event handlers
         * and cancels any pending timeouts.
         * @return {void}
         * @method stop
         * @static
         */
        stop = function () {

            //set to disabled
            enabled = false;

            //clear any pending timeouts
            clearTimeout($.idleTimer.tId);

            //detach the event handlers
            $(document).unbind('.idleTimer');
        },


        /* (intentionally not documented)
         * Handles a user event indicating that the user isn't idle.
         * @param {Event} event A DOM2-normalized event object.
         * @return {void}
         */
        handleUserEvent = function () {

            //clear any existing timeout
            clearTimeout($.idleTimer.tId);



            //if the idle timer is enabled
            if (enabled) {


                //if it's idle, that means the user is no longer idle
                if (idle) {
                    toggleIdleState();
                }

                //set a new timeout
                $.idleTimer.tId = setTimeout(toggleIdleState, timeout);

            }
        };


        /**
         * Starts the idle timer. This adds appropriate event handlers
         * and starts the first timeout.
         * @param {int} newTimeout (Optional) A new value for the timeout period in ms.
         * @return {void}
         * @method $.idleTimer
         * @static
         */


        f.olddate = f.olddate || +new Date;

        //assign a new timeout if necessary
        if (typeof newTimeout == "number") {
            timeout = newTimeout;
        } else if (newTimeout === 'destroy') {
            stop();
            return this;
        } else if (newTimeout === 'getElapsedTime') {
            return (+new Date) - f.olddate;
        }

        //assign appropriate event handlers
        $(document).bind($.trim((events + ' ').split(' ').join('.idleTimer ')), handleUserEvent);


        //set a timeout to toggle state
        $.idleTimer.tId = setTimeout(toggleIdleState, timeout);

        // assume the user is active for the first x seconds.
        $.data(document, 'idleTimer', "active");




    }; // end of $.idleTimer()



})(jQuery);


/*
 * jQuery Idle Timeout 1.1
 * Copyright (c) 2011 Eric Hynds
 *
 * http://www.erichynds.com/jquery/a-new-and-improved-jquery-idle-timeout-plugin/
 *
 * Depends:
 *  - jQuery 1.4.2+
 *  - jQuery Idle Timer (by Paul Irish, http://paulirish.com/2009/jquery-idletimer-plugin/)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/

(function ($, win) {

    var idleTimeout = {
        init: function (element, resume, options) {
            var self = this, elem;

            this.warning = elem = $(element);
            this.resume = $(resume);
            this.options = options;
            this.countdownOpen = false;
            this.failedRequests = options.failedRequests;
            this._startTimer();

            // expose obj to data cache so peeps can call internal methods
            $.data(elem[0], 'idletimout', this);

            // start the idle timer
            $.idleTimer(options.idleAfter * 1000);

            // once the user becomes idle
            $(document).bind("idle.idleTimer", function () {

                // if the user is idle and a countdown isn't already running
                if ($.data(document, 'idleTimer') === 'idle' && !self.countdownOpen) {
                    self._stopTimer();
                    self.countdownOpen = true;
                    self._idle();
                }
            });

            // bind continue link
            this.resume.bind("click", function (e) {
                e.preventDefault();

                win.clearInterval(self.countdown); // stop the countdown
                self.countdownOpen = false; // stop countdown
                self._startTimer(); // start up the timer again
                self._keepAlive(false); // ping server
                options.onResume.call(self.warning); // call the resume callback
            });
        },

        _idle: function () {
            var self = this,
				options = this.options,
				warning = this.warning[0],
				counter = options.warningLength;

            // fire the onIdle function
            options.onIdle.call(warning);

            // set inital value in the countdown placeholder
            options.onCountdown.call(warning, counter);

            // create a timer that runs every second
            this.countdown = win.setInterval(function () {
                if (--counter === 0) {
                    window.clearInterval(self.countdown);
                    options.onTimeout.call(warning);
                } else {
                    options.onCountdown.call(warning, counter);
                }
            }, 1000);
        },

        _startTimer: function () {
            var self = this;

            this.timer = win.setTimeout(function () {
                self._keepAlive();
            }, this.options.pollingInterval * 1000);
        },

        _stopTimer: function () {
            // reset the failed requests counter
            this.failedRequests = this.options.failedRequests;
            win.clearTimeout(this.timer);
        },

        _keepAlive: function (recurse) {
            var self = this,
				options = this.options;

            if (typeof recurse === "undefined") {
                recurse = true;
            }

            // if too many requests failed, abort
            if (!this.failedRequests) {
                this._stopTimer();
                options.onAbort.call(this.warning[0]);
                return;
            }

            $.ajax({
                timeout: options.AJAXTimeout,
                url: options.keepAliveURL,
                error: function () {
                    self.failedRequests--;
                },
                success: function (response) {
                    if ($.trim(response) !== options.serverResponseEquals) {
                        self.failedRequests--;
                    }
                },
                complete: function () {
                    if (recurse) {
                        self._startTimer();
                    }
                }
            });
        }
    };

    // expose
    $.idleTimeout = function (element, resume, options) {
        idleTimeout.init(element, resume, $.extend($.idleTimeout.options, options));
        return this;
    };

    // options
    $.idleTimeout.options = {
        // number of seconds after user is idle to show the warning
        warningLength: 30,

        // url to call to keep the session alive while the user is active
        keepAliveURL: "",

        // the response from keepAliveURL must equal this text:
        serverResponseEquals: "OK",

        // user is considered idle after this many seconds.  10 minutes default
        idleAfter: 600,

        // a polling request will be sent to the server every X seconds
        pollingInterval: 60,

        // number of failed polling requests until we abort this script
        failedRequests: 5,

        // the $.ajax timeout in MILLISECONDS! 
        AJAXTimeout: 250,

        /*
			Callbacks
			"this" refers to the element found by the first selector passed to $.idleTimeout.
		*/
        // callback to fire when the session times out
        onTimeout: $.noop,

        // fires when the user becomes idle
        onIdle: $.noop,

        // fires during each second of warningLength
        onCountdown: $.noop,

        // fires when the user resumes the session
        onResume: $.noop,

        // callback to fire when the script is aborted due to too many failed requests
        onAbort: $.noop
    };

})(jQuery, window);

// Generated by CoffeeScript 1.4.0
(function () {
    var Heyoffline, addEvent, destroy, extend, setStyles,
      __slice = [].slice,
      __bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };
    extend = function () {
        var ext, extensions, key, obj, value, _i, _len;
        obj = arguments[0], extensions = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        for (_i = 0, _len = extensions.length; _i < _len; _i++) {
            ext = extensions[_i];
            for (key in ext) {
                value = ext[key];
                obj[key] = value;
            }
        }
        return obj;
    };
    addEvent = function (element, event, fn, useCapture) {
        if (useCapture == null) {
            useCapture = false;
        }
        return element.addEventListener(event, fn, useCapture);
    };

    setStyles = function (element, styles) {
        var key, _results;
        _results = [];
        for (key in styles) {
            _results.push(element.style[key] = styles[key]);
        }
        return _results;
    };

    destroy = function (element) {
        return element.parentNode.removeChild(element);
    };

    Heyoffline = (function () {

        Heyoffline.prototype.options = {
            text: {
                title: "You're currently offline",
                content: "Seems like you've gone offline,                you might want to wait until your network comes back before continuing.<br /><br />                This message will self-destruct once you're online again.",
                button: "Relax, I know what I'm doing"
            },
            monitorFields: false,
            prefix: 'heyoffline',
            noStyles: false,
            disableDismiss: false,
            elements: ['input', 'select', 'textarea', '*[contenteditable]']
        };

        Heyoffline.prototype.modified = false;

        function Heyoffline(options) {
            this.hideMessage = __bind(this.hideMessage, this);

            this.offline = __bind(this.offline, this);

            this.online = __bind(this.online, this);
            extend(this.options, options);
            this.setup();
        }

        Heyoffline.prototype.setup = function () {
            this.events = {
                element: ['keyup', 'change'],
                network: ['online', 'offline']
            };
            this.elements = {
                fields: document.querySelectorAll(this.options.elements.join(',')),
                overlay: document.createElement('div'),
                modal: document.createElement('div'),
                heading: document.createElement('h2'),
                content: document.createElement('p'),
                button: document.createElement('a')
            };
            this.defaultStyles = {
                overlay: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 500
                },
                modal: {
                    padding: '15px',
                    width: '450px',
                    margin: '0 auto',
                    position: 'relative',
                    top: '30%',
                    borderRadius: '2px',
                    zIndex: 600
                },
                heading: {
                    fontSize: '1.7em',
                    paddingBottom: '15px'
                },
                content: {
                    paddingBottom: '15px'
                },
                button: {
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    'text-decoration': 'underline',
                    color: '#fff'
                }
            };
            return this.attachEvents();
        };

        Heyoffline.prototype.createElements = function () {
            this.createElement(document.body, 'overlay');
            this.resizeOverlay();
            this.createElement(this.elements.overlay, 'modal');
            this.createElement(this.elements.modal, 'heading', this.options.text.title);
            this.createElement(this.elements.modal, 'content', this.options.text.content);
            if (!this.options.disableDismiss) {
                this.createElement(this.elements.modal, 'button', this.options.text.button);
                return addEvent(this.elements.button, 'click', this.hideMessage);
            }
        };

        Heyoffline.prototype.createElement = function (context, element, text) {
            this.elements[element] = context.appendChild(this.elements[element]);
            if (text) {
                this.elements[element].setAttribute('class', "" + this.options.prefix + "_" + element);
                this.elements[element].innerHTML = text;
            } else {
                this.elements[element].setAttribute('class', "" + this.options.prefix + "_" + element + " alert alert-error");
            }
            if (!this.options.noStyles) {
                return setStyles(this.elements[element], this.defaultStyles[element]);
            }
        };

        Heyoffline.prototype.resizeOverlay = function () {
            return setStyles(this.elements.overlay, {
                height: "" + window.innerHeight + "px"
            });
        };

        Heyoffline.prototype.destroyElements = function () {
            if (this.elements.overlay) {
                return destroy(this.elements.overlay);
            }
        };

        Heyoffline.prototype.attachEvents = function () {
            var event, field, _i, _j, _len, _len1, _ref, _ref1,
              _this = this;
            _ref = this.elements.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                field = _ref[_i];
                this.elementEvents(field);
            }
            _ref1 = this.events.network;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                event = _ref1[_j];
                this.networkEvents(event);
            }
            return addEvent(window, 'resize', function () {
                return _this.resizeOverlay();
            });
        };

        Heyoffline.prototype.elementEvents = function (field) {
            var event, _i, _len, _ref, _results,
              _this = this;
            _ref = this.events.element;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                event = _ref[_i];
                _results.push((function (event) {
                    return addEvent(field, event, function () {
                        return _this.modified = true;
                    });
                })(event));
            }
            return _results;
        };

        Heyoffline.prototype.networkEvents = function (event) {
            return addEvent(window, event, this[event]);
        };

        Heyoffline.prototype.online = function (event) {
            return this.hideMessage();
        };

        Heyoffline.prototype.offline = function () {
            if (this.options.monitorFields) {
                if (this.modified) {
                    return this.showMessage();
                }
            } else {
                return this.showMessage();
            }
        };

        Heyoffline.prototype.showMessage = function () {
            this.createElements();
            if (this.options.onOnline) {
                return this.options.onOnline.call(this);
            }
        };

        Heyoffline.prototype.hideMessage = function (event) {
            if (event) {
                event.preventDefault();
            }
            this.destroyElements();
            if (this.options.onOffline) {
                return this.options.onOffline.call(this);
            }
        };

        return Heyoffline;

    })();

    addEvent(window, 'load', function () {
        return window.Heyoffline = new Heyoffline;
    });

}).call(this);





