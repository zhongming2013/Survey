Zepto(function ($) {
    console.log('Zepto is ready');
    var questions = [
        {
            question: '美妆虽然会给我们带来改善肤色，提升气质等的效果，但是其负面作用还是不可忽略，请问化妆后多久要进行卸妆?',
            options: ['3-6小时', '6-7小时', '7小时以上'],
            answer: 0
        },
        {
            question: '以下哪种精油具有消炎祛痘的功效？',
            options: ['薰衣草', '茶树', '茉莉'],
            answer: 1
        },
        {
            question: '以下错误的护理方法是？',
            options: ['将眼霜涂在上眼皮上', '先卸眼妆再清洁面部', '深层清洁面部避开眉毛等部位'],
            answer: 0
        },
        {
            question: '敷清洁类面膜的时长最适宜为？',
            options: ['5-10分钟', '10-15分钟', '15分钟以上'],
            answer: 0
        },
        {
            question: '洗头发的时候，护发素应该涂在头发的什么部位？',
            options: ['发稍', '发稍和发中', '发根、发梢和发中'],
            answer: 1
        },
        {
            question: '果酸能促进“去角质”，有助新皮肤细胞的生成，从而增加皮肤的厚度，改善肌肤。但果酸也存在增加皮肤的敏感性尤其是被晒伤的可能性。美国化妆品成分评审专家小组认为产品需满足三项条件才能防止果酸副作用，以下哪项不属于？',
            options: ['果酸含量不超过10%', '产品的pH值高于3.5', '各类护肤化妆产品粘度不超过特定值'],
            answer: 2
        },
        {
            question: '蛋清敷脸能收缩毛孔，以下哪种肤质适合？',
            options: ['干性', '中性', '油性'],
            answer: 2
        },
        {
            question: '有关去角质，以下说法不当的是？',
            options: ['中性肌肤不太需要去角质', '脸部各部分都需去角质', '洗完澡后去角质事半功倍'],
            answer: 1
        },
    ];
    var results = [
        {
            range: '1-3',
            comment: '淡淡的忧伤，还只是美丽小白哦，没关系，再接再厉哦！',
            donation: '0.5'
        },
        {
            range: '4-6',
            comment: '恭喜你进阶为美丽练习生，再接再厉哦！',
            donation: '0.8'
        },
        {
            range: '7-8',
            comment: '恭喜你成为美丽达人，棒棒哒！',
            donation: '1.0'
        }
    ];
    var thanksStr = '感谢您为“美丽事业，美好人生”公益项目捐出{f}元，将帮助更多年轻人成就美丽梦想！';

    $('.loading').hide();
    $('.welcome').addClass('active');

    $('#join-btn').on('click', function () {
        $('.welcome').removeClass('active').addClass('up');
        $('.introduction').addClass('active');
    });

    $('#begin-btn').on('click', function () {
        var sections = $('.test > section');
        $('.introduction').removeClass('active').addClass('up');
        $('.test').addClass('active');
        $(sections[0]).addClass('current');
        $(sections[1]).addClass('next');
    });

    $('.lottery').on('click', function () {
        $('.result').removeClass('active').addClass('up');
        $('.more').addClass('active');
    });

    var Survey = function (questions) {
        this.current = 0;
        this.answers = [];
        this.questions = questions;

        this.init();
    }
    Survey.prototype = {
        init: function () {
            this.html();
            this.sections = $('section');
            this.total = this.sections.length;

            $('.main').on('change', this.onCheck.bind(this));
        },
        html: function () {
            var html = '';
            var questions = this.questions;
            for (var i=0, l=questions.length; i<l; i++) {
                var optionsHtml = '';
                var options = questions[i].options;
                for (var j=0, k=options.length; j < k; j++) {
                    var id = 'qst' + i + '-opt' + j;
                    optionsHtml += '<label for="' + id + '" class="pure-radio">'
                        + '<input id="' + id +'" type="radio" name="qst' + i 
                        + '" value="' + j + '">'
                        + options[j] + '</label>'
                }
                
                html += '<section><p class="question">' + questions[i].question 
                    + '</p><form class="pure-form answers">'
                    + optionsHtml + '</form></section>'
            }
            $('.test > img').after(html);
        },
        next: function () {

            if (this.current < this.total) {
                console.log('next');
                this.current++;
            }

            if (this.current === this.total) {
                this.result();
                console.log('end');
                return;
            }
            
            if (this.current > 0) {
                $(this.sections[this.current - 1])
                    .removeClass('current')
                    .addClass('pre');
            }
            
            $(this.sections[this.current])
                .removeClass('next')
                .addClass('current');

            if (this.current < this.total - 1) {
                $(this.sections[this.current + 1])
                    .addClass('next');
            }
        },
        onCheck: function (e) {
            var answer = +e.target.value;
            console.log('Q: %d, A: %s', this.current, answer);
            this.answers[this.current] = answer;
            this.next();
        },
        result: function () {
            var score = 0, rank = 0;
            var l = this.questions.length;
            for (var i=0; i < l; i++) {
                if (this.answers[i + 1] === this.questions[i].answer) {
                    score++;
                }
            }

            if (score > 3 && score < 6) {
                rank = 1;
            } else if (score > 6) {
                rank = 2;
            }

            var result = results[2];
            $('.comment').html(result.comment);
            $('.donation').html(thanksStr.replace(/{f}/, result.donation));
            $('.test').removeClass('active').addClass('up');
            $('.result').addClass('active');
        }
    }

    var survey = new Survey(questions);

});