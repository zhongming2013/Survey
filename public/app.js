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
    var Survey = function (questions) {
        this.current = 0;
        this.answers = [];
        this.questions = questions;

        this.isJoin = false;

        this.init();
    }
    Survey.prototype = {
        init: function () {
            this.html();
            this.sections = $('section');
            this.total = this.sections.length;
            $($('.current').next()).addClass('next');
            $('#join').on('click', this.join.bind(this));
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
            $('.current').after(html);
        },
        next: function () {

            if (this.current < this.total - 1) {
                console.log('next');
                this.current++;
            }

            if (this.current === this.total - 1) {
                this.score();
                console.log('end');
            }
            
            if (this.current > 0) {
                $(this.sections[this.current - 1])
                    .removeClass()
                    .addClass('pre');
            }
            
            $(this.sections[this.current])
                .removeClass()
                .addClass('current');

            if (this.current < this.sections.length - 1) {
                $(this.sections[this.current + 1])
                    .removeClass()
                    .addClass('next');
            }
        },
        prev: function () {
            if (this.current > 0) {
                this.current--;
            }
        },
        join: function () {
            console.log('join');
            this.isJoin = true;
            this.next();
        },
        onCheck: function (e) {
            var answer = +e.target.value;
            console.log('Q: %d, A: %s', this.current, answer);
            this.answers[this.current] = answer;
            this.next();
        },
        score: function () {
            var score = 0;
            var l = this.questions.length;
            for (var i=0; i < l; i++) {
                if (this.answers[i + 1] === this.questions[i].answer) {
                    score++;
                }
            }
            $('.right').html(score);
            $('.total').html(l);
        }
    }

    var survey = new Survey(questions);

});