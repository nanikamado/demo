(() => {
    let isClipSupport = () => {
        let div = document.createElement('div');
        div.style.cssText = 'clip-path: circle(0 at right 2rem top 1.24rem)';
        return div.style.length
    };
    let main = () => {
        let pageNum = 0,
            buttonAct = !1;
        const $ = t => document.querySelectorAll(t),
            contents = $('.cont>div'),
            menuElm = $('.menu')[0],
            topElm = $('.top.page')[0],
            buttonElm = $('.button')[0],
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
        if (!isClipSupport()) {
            menuElm.classList.add('clip-not-support');
        };
        menuElm.querySelectorAll('li a>div').forEach((e, index) => e.addEventListener('click', e => {
            movePage(index);
            e.preventDefault();
        }));
        $('.button')[0].addEventListener('click', () => {
            if (buttonAct) {
                menuElm.classList.remove('active');
                buttonAct = !1;
            } else {
                menuElm.classList.add('active');
                buttonElm.classList.remove('black');
                buttonAct = !0;
            }
        });
        setTimeout(() => topElm.classList.add('showed'), 2000);
    };
    document.addEventListener("DOMContentLoaded", main);
})();