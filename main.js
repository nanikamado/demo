try {
    Function("a => 1")
} catch (e) {
    alert('お使いのブラウザではサイトを正しく表示することができません。最新のChrome, Firefox, Edge, Safari をお使いください。')
}
(() => {
    'use strict';
    const $$ = t => document.querySelectorAll(t),
        $ = t => document.querySelector(t);
    let isClipSupport = () => {
        let div = document.createElement('div');
        div.style.cssText = 'clip-path: circle(0 at right 2rem top 1.24rem)';
        return div.style.length;
    };
    let main = () => {
            let pageNum = 0,
                buttonAct = !1;
            const contents = $$('.cont>div'),
                menuElm = $('.menu'),
                topElm = $('.top.page'),
                buttonElm = $('.button'),
                menuLists = menuElm.querySelectorAll('li'),
                movePage = index => {
                    if (index === pageNum) {
                        menuElm.classList.remove('active');
                        buttonAct = !1;
                        return;
                    };
                    contents[pageNum].style.display = 'none';
                    contents[index].style.display = 'block';
                    if (index && !pageNum) {
                        document.body.className = '';
                        scrollTo(0, 0);
                        topElm.classList.remove('showed');
                    } else if (!index) {
                        document.body.className = 'is-top';
                        topElm.classList.add('showed');
                    }
                    menuLists[index].className = 'active';
                    menuLists[pageNum].className = '';
                    menuElm.classList.remove('active');
                    buttonAct = !1;
                    switch (index) {
                        case 1:
                        case 2:
                            buttonElm.classList.add('black');
                    }
                    pageNum = index;
                    history.pushState('', '', '?' + index);
                }; {
                let index = location.search.substring(1);
                switch (index) {
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                        movePage(index);
                }
            };
            if (isClipSupport()) {
                menuElm.classList.remove('clip-not-support');
            };
            menuElm.querySelectorAll('li a>div').forEach((e, index) => e.addEventListener('click', e => {
                movePage(index);
                e.preventDefault();
            }));
            $$('.button')[0].addEventListener('click', () => {
                if (buttonAct) {
                    menuElm.classList.remove('active');
                    buttonAct = !1;
                } else {
                    menuElm.classList.add('active');
                    buttonElm.classList.remove('black');
                    buttonAct = !0;
                }
            });
            document.addEventListener('scroll', () => {
                $$('.cont>div:nth-child(1) h2').forEach(addShowed)
            });
        },
        addShowed = t => {
            if (!t.classList.contains('showed') && t.getBoundingClientRect().bottom < window.innerHeight) {
                t.classList.add('showed');
            }
        };
    document.addEventListener("DOMContentLoaded", main);
    window.addEventListener('load', () => {
        $('.top.page').classList.add('showed');
    });
})();