
(function ($) {
    function setCookie(cookieName, cookieValue, expirationDays) {
        const d = new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000)); // Expiration time in milliseconds
        const expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
    }

    function getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }

    const sessionId = Math.random().toString(36).substr(2, 10);

    setCookie('sessionId', sessionId, 7); // Expires in 7 days


    var $messages = $(".messages-content"),
        d,
        m;

    $(window).load(function () {
        $messages.mCustomScrollbar();
        setTimeout(function () {
            fakeMessage();
        }, 100);
    });

    function updateScrollbar() {
        $messages
            .mCustomScrollbar("update")
            .mCustomScrollbar("scrollTo", "bottom", {
                scrollInertia: 10,
                timeout: 0,
            });
    }

    function setDate() {
        d = new Date();
        if (m != d.getMinutes()) {
            m = d.getMinutes();
            var hours = d.getHours();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            var strTime = hours.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ' ' + ampm;
            $('<div class="timestamp">' + strTime + '</div>').appendTo($(".message:last-child"));
        }
    }

    function insertMessage() {
        msg = $(".message-input").val();
        if ($.trim(msg) == "") {
            return false;
        }
        $('<div class="message message-personal">' + msg + "</div>")
            .appendTo($(".mCSB_container"))
            .addClass("new");
        setDate();
        updateScrollbar();
        fakeMessage();
    }

    $(".message-submit").click(function () {
        insertMessage();
    });

    $(window).on("keydown", function (e) {
        if (e.which == 13) {
            insertMessage();
            return false;
        }
    });

    async function fakeMessage() {
        $(".message.loading").remove();
        if ($(".message-input").val() == "") {
            $(
                '<div class="message new"><figure class="avatar"><img src="https://andyroy.pythonanywhere.com/static/img/improvize logo-oval-v2-900x900.png" /></figure>' +
                "Welcome to Improvize LLC" +
                "</div>"
            )
                .appendTo($(".mCSB_container"))
                .addClass("new");
            setDate();
            updateScrollbar();
            return
        }
        $(
            '<div class="message loading new"><figure class="avatar"><img src="https://andyroy.pythonanywhere.com/static/img/improvize logo-oval-v2-900x900.png" /></figure><span></span></div>'
        ).appendTo($(".mCSB_container"));
        updateScrollbar();

        msg = $(".message-input").val();
        $(".message-input").val(null);

        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');

        const sessionId = getCookie('sessionId');

        await $.ajax({
            url: 'https://app.improvize.com/botv2',
            type: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": "andy-WGVoMGfN"
            },
            dataType: 'json',
            data: JSON.stringify({
                pin: '1945',
                user: sessionId,
                query: msg,
                page: page
            }),
            success: function (response) {
                setTimeout(function () {
                    $(".message.loading").remove();
                    $(
                        '<div class="message new"><figure class="avatar"><img src="https://andyroy.pythonanywhere.com/static/img/improvize logo-oval-v2-900x900.png" /></figure>' +
                        response.answer +
                        "</div>"
                    )
                        .appendTo($(".mCSB_container"))
                        .addClass("new");
                    setDate();
                    updateScrollbar();
                }, 1000 + Math.random() * 20 * 100);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                $(".message.loading").remove();
            }
        });
    }

    //     setTimeout(function () {
    //         $(".message.loading").remove();
    //         $(
    //             '<div class="message new"><figure class="avatar"><img src="https://andyroy.pythonanywhere.com/static/img/improvize logo-oval-v2-900x900.png" /></figure>' +
    //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
    //             "</div>"
    //         )
    //             .appendTo($(".mCSB_container"))
    //             .addClass("new");
    //         setDate();
    //         updateScrollbar();
    //     }, 1000 + Math.random() * 20 * 100);
    // }
})(jQuery);
