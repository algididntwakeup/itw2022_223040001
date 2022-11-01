particlesJS(
  'particles-js',

  {
    particles: {
      number: {
        value: 90,
        density: {
          enable: true,
          value_area: 600,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab',
        },
        onclick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
    config_demo: {
      hide_card: false,
      background_color: '#b61924',
      background_image: '',
      background_position: '50% 50%',
      background_repeat: 'no-repeat',
      background_size: 'cover',
    },
  }
);

TypingText = function (element, interval, cursor, finishedCallback) {
  if (typeof document.getElementById == 'undefined' || typeof element.innerHTML == 'undefined') {
    this.running = true;
    return;
  }
  this.element = element;
  this.finishedCallback = finishedCallback
    ? finishedCallback
    : function () {
        return;
      };
  this.interval = typeof interval == 'undefined' ? 100 : interval;
  this.origText = this.element.innerHTML;
  this.unparsedOrigText = this.origText;
  this.cursor = cursor ? cursor : '';
  this.currentText = '';
  this.currentChar = 0;
  this.element.typingText = this;
  if (this.element.id == '') this.element.id = 'typingtext' + TypingText.currentIndex++;
  TypingText.all.push(this);
  this.running = false;
  this.inTag = false;
  this.tagBuffer = '';
  this.inHTMLEntity = false;
  this.HTMLEntityBuffer = '';
};
TypingText.all = new Array();
TypingText.currentIndex = 0;
TypingText.runAll = function () {
  for (var i = 0; i < TypingText.all.length; i++) TypingText.all[i].run();
};
TypingText.prototype.run = function () {
  if (this.running) return;
  if (typeof this.origText == 'undefined') {
    setTimeout("document.getElementById('" + this.element.id + "').typingText.run()", this.interval);
    return;
  }
  if (this.currentText == '') this.element.innerHTML = '';
  if (this.currentChar < this.origText.length) {
    if (this.origText.charAt(this.currentChar) == '<' && !this.inTag) {
      this.tagBuffer = '<';
      this.inTag = true;
      this.currentChar++;
      this.run();
      return;
    } else if (this.origText.charAt(this.currentChar) == '>' && this.inTag) {
      this.tagBuffer += '>';
      this.inTag = false;
      this.currentText += this.tagBuffer;
      this.currentChar++;
      this.run();
      return;
    } else if (this.inTag) {
      this.tagBuffer += this.origText.charAt(this.currentChar);
      this.currentChar++;
      this.run();
      return;
    } else if (this.origText.charAt(this.currentChar) == '&' && !this.inHTMLEntity) {
      this.HTMLEntityBuffer = '&';
      this.inHTMLEntity = true;
      this.currentChar++;
      this.run();
      return;
    } else if (this.origText.charAt(this.currentChar) == ';' && this.inHTMLEntity) {
      this.HTMLEntityBuffer += ';';
      this.inHTMLEntity = false;
      this.currentText += this.HTMLEntityBuffer;
      this.currentChar++;
      this.run();
      return;
    } else if (this.inHTMLEntity) {
      this.HTMLEntityBuffer += this.origText.charAt(this.currentChar);
      this.currentChar++;
      this.run();
      return;
    } else {
      this.currentText += this.origText.charAt(this.currentChar);
    }
    this.element.innerHTML = this.currentText;
    this.element.innerHTML += this.currentChar < this.origText.length - 1 ? (typeof this.cursor == 'function' ? this.cursor(this.currentText) : this.cursor) : '';
    this.currentChar++;
    setTimeout("document.getElementById('" + this.element.id + "').typingText.run()", this.interval);
  } else {
    this.currentText = '';
    this.currentChar = 0;
    this.running = false;
    this.finishedCallback();
  }
};
