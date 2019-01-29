var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['pin_get_bit'] = {
  init: function () {
    this.appendValueInput("pin")
      .appendField(Blockly.Msg.WEBDUINO_PIN_BIT, "Pin")
      .setCheck("Number");
    this.setOutput(true);
    this.setColour(270);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/blockly/board-pin.html' + utmUrl);
  }
};

Blockly.Blocks['pin_num_bit'] = {
  init: function () {
    function getPinDropdown() {
      return [
        ["0~", "0"],
        ["1~ ( A4 )", "1"],
        ["2~ ( A5 )", "2"],
        ["3~", "3"],
        ["4~", "4"],
        ["5 ( A7 )", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"],
        ["9", "9"],
        ["10~", "10"],
        ["11", "11"],
        ["13", "13"],
        ["14", "14"],
        ["15", "15"],
        ["16", "16"]
      ];
    }

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(getPinDropdown), "pin_");
    this.setOutput(true);
    this.setColour(230);
    this.setOutput(true, "Number");
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/blockly/board-pin.html' + utmUrl);
  }
};

Blockly.Blocks['pin_board_bit'] = {
  init: function () {
    this.appendValueInput("pin_")
      .setCheck(["Number", "pin_num"])
      .appendField(Blockly.Msg.WEBDUINO_BOARD, "Board")
      .appendField(new Blockly.FieldDropdown(this.getBoardsDropdown), "board_");
    this.setOutput(true);
    this.setColour(270);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/blockly/board-pin.html' + utmUrl);
  },
  getBoardsDropdown: function () {
    var nameMap = {
      '1': Blockly.Msg.WEBDUINO_BOARD_WIFI,
      '2': Blockly.Msg.WEBDUINO_BOARD_SERIAL,
      '3': Blockly.Msg.WEBDUINO_BOARD_BLUETOOTH,
      '4': Blockly.Msg.WEBDUINO_BOARD_WEBSOCKET
    },
      xml = Blockly.Xml.workspaceToDom(Code.workspace),
      boards = xml.querySelectorAll("block[type=board_ready], block[type=smart_ready], block[type=board]"),
      menus = [];

    if (boards.length < 1) {
      return [
        ['', '']
      ];
    }

    for (var i = 0; i < boards.length; i++) {
      var item = boards[i],
        type = item.querySelector('field[name=type_]').textContent,
        param = item.querySelector('value[name=device_]').textContent;

      switch (type) {
        case '1':
          menus.push(['(' + nameMap['1'] + ') ' + param, "{transport: 'mqtt', device: '" + param + "'}"]);
          break;

        case '2':
          menus.push(['(' + nameMap['2'] + ') ' + param, "{transport: 'serial', path: '" + param + "'}"]);
          break;

        case '3':
          menus.push(['(' + nameMap['3'] + ') ' + param, "{transport: 'bluetooth', address: '" + param + "'}"]);
          break;

        case '4':
          menus.push(['(' + nameMap['4'] + ') ' + param, "{transport: 'websocket', url: '" + param + "'}"]);
          break;

        default:
          menus.push(['', '']);
          break;
      }
    }

    return menus;
  }
};

Blockly.Blocks['pin_set_mode'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_PIN_SET, "Set")
      .appendField(new Blockly.FieldVariable("pin"), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_PIN_MODE, "Mode")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_PIN_DIN, "0"],
        [Blockly.Msg.WEBDUINO_PIN_DOUT, "1"],
        [Blockly.Msg.WEBDUINO_PIN_AIN, "2"],
        [Blockly.Msg.WEBDUINO_PIN_AOUT, "3"]
      ]), "mode_");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/blockly/board-pin.html' + utmUrl);
  }
};

Blockly.Blocks['pin_read'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_PIN_READ)
      .appendField(new Blockly.FieldVariable("pin"), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_PIN_VALUE);
    this.setOutput(true);
    this.setColour(35);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/blockly/board-pin.html' + utmUrl);
  }
};

Blockly.Blocks['pin_write'] = {
  init: function () {
    this.appendValueInput("value_")
      .appendField(Blockly.Msg.WEBDUINO_PIN_WRITE)
      .appendField(new Blockly.FieldVariable("pin"), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_PIN_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/blockly/board-pin.html' + utmUrl);
  }
};