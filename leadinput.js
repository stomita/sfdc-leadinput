Ext.onReady(function() {

  var prefStore = new Ext.data.SimpleStore({
    fields : ['text','value'],
    data : [["北海道", "北海道"], ["青森県", "青森県"], ["岩手県", "岩手県"], ["宮城県", "宮城県"], ["秋田県", "秋田県"], ["山形県", "山形県"], ["福島県", "福島県"], ["茨城県", "茨城県"], ["栃木県", "栃木県"], ["群馬県", "群馬県"], ["埼玉県", "埼玉県"], ["千葉県", "千葉県"], ["東京都", "東京都"], ["神奈川県", "神奈川県"], ["山梨県", "山梨県"], ["新潟県", "新潟県"], ["富山県", "富山県"], ["石川県", "石川県"], ["福井県", "福井県"], ["長野県", "長野県"], ["岐阜県", "岐阜県"], ["静岡県", "静岡県"], ["愛知県", "愛知県"], ["三重県", "三重県"], ["滋賀県", "滋賀県"], ["京都府", "京都府"], ["大阪府", "大阪府"], ["兵庫県", "兵庫県"], ["奈良県", "奈良県"], ["和歌山県", "和歌山県"], ["鳥取県", "鳥取県"], ["島根県", "島根県"], ["岡山県", "岡山県"], ["広島県", "広島県"], ["山口県", "山口県"], ["徳島県", "徳島県"], ["香川県", "香川県"], ["愛媛県", "愛媛県"], ["高知県", "高知県"], ["福岡県", "福岡県"], ["佐賀県", "佐賀県"], ["長崎県", "長崎県"], ["熊本県", "熊本県"], ["大分県", "大分県"], ["宮崎県", "宮崎県"], ["鹿児島県", "鹿児島県"], ["沖縄県", "沖縄県"]]
  });

  var w = new Ext.Window({
    layout : 'fit',
    width : 500, height : 550,
    closable : false,
    modal : true,
    shim : false,
    items : {
      xtype : 'form',
      itemId : 'inputForm',
      title : 'リード入力',
      frame : true,
      defaultType : 'textfield',
      defaults : { width : '300' },
      items : [{
        xtype : 'hidden',
        itemId : 'Id'
      }, {
        fieldLabel : '姓',
        itemId : 'LastName'
      }, {
        fieldLabel : '名',
        itemId : 'FirstName'
      }, {
        fieldLabel : '会社名',
        itemId : 'Company'
      }, {
        fieldLabel : '役職',
        itemId : 'Title'
      }, {
        fieldLabel : 'メールアドレス',
        itemId : 'Email'
      }, {
        fieldLabel : '郵便番号',
        itemId : 'PostalCode',
        width : 150
      }, {
        xtype : 'combo',
        fieldLabel : '都道府県',
        itemId : 'State',
        store : prefStore,
        triggerAction : 'all',
        mode : 'local',
        displayField : 'text',
        valueField : 'value',
        width : 150
      }, {
        fieldLabel : '市区郡',
        itemId : 'City'
      }, {
        xtype : 'textarea',
        fieldLabel : '町名・番地',
        itemId : 'Street'
      }, {
        fieldLabel : '電話',
        itemId : 'Phone'
      }, {
        fieldLabel : '携帯電話',
        itemId : 'MobilePhone'
      }, {
        fieldLabel : 'FAX',
        itemId : 'Fax'
      }, {
        fieldLabel : 'リードソース',
        itemId : 'LeadSource'
      }, {
        fieldLabel : 'Webサイト',
        itemId : 'Website'
      }, {
        xtype : 'textarea',
        fieldLabel : '説明',
        itemId : 'Description'
      }],
      buttons : [
        { text : '保存 (CTRL+Enter)', handler : save }, 
        { text : 'クリア', handler : clear }
      ],
      keys : [
        { key : [10, 13], ctrl : true, fn : save } 
      ]
    }

  });

  w.show();


  var inputForm = w.getComponent('inputForm');
  inputForm.getComponent('PostalCode').on('change', handleZipChange);

  inputForm.getComponent('Company').on('change', handleCompanyChange);

  var fields = [];
  inputForm.items.each(function(field) { fields.push(field.getItemId()) });

  var dupStore = new Ext.data.SimpleStore({
    fields : fields,
    data : []
  });

  var dupTip = new Ext.Tip({
    title : '重複の検出',
    width : 400,
    closable : true,
    layout : 'anchor',
    items : {
      anchor : '100%',
      xtype : 'grid',
      store : dupStore,
      columns : [
        { header : '姓', dataIndex : 'LastName', width : 50 },
        { header : '名', dataIndex : 'FirstName', width : 50 },
        { header : '会社', dataIndex : 'Company', width : 200 },
        { header : 'メールアドレス', dataIndex : 'Email', width : 100 }
      ],
      viewConfig : { forceFit : true },
      listeners : {
        rowdblclick : handleDupDblclick
      }
    }
  });

  inputForm.getComponent('Email').on('change', handleEmailChange);


  function handleCompanyChange(field, value) {
    if (!value || value.length==0) return;

    var soql = 
      "SELECT "+fields.join(',')+" FROM Lead "+
      " WHERE Company = '"+value+"' "+
      " AND PostalCode != NULL "+
      " ORDER BY CreatedDate DESC "+
      " LIMIT 1";
    console.log(soql);

    sforce.connection.query(soql,
      { onSuccess : onSuccess, onFailure : onFailure }
    );

    function onSuccess(result) {
      if (result.size==0) return;
      var record = result.getArray('records')[0];
      inputForm.getComponent('PostalCode').setValue(record.PostalCode);
      inputForm.getComponent('State').setValue(record.State);
      inputForm.getComponent('City').setValue(record.City);
      inputForm.getComponent('Street').setValue(record.Street);
      inputForm.getComponent('Phone').setValue(record.Phone);
      inputForm.getComponent('Fax').setValue(record.Fax);
      inputForm.getComponent('Website').setValue(record.Website);
    }

    function onFailure() {}
  }


  function handleZipChange(field, value) {
    if (!value || value.length==0) return;

    sforce.connection.remoteFunction({
      url : 'http://zip.ricollab.jp/search?q='+encodeURIComponent(value)+'&format=json',
      success : onSuccess,
      error : onFailure
    });

    function onSuccess(res) {
      res = JSON.parse(res);
      var result = res.result;
      if (result && result.length>0) {
        $.ajax({
          url : result[0].link+'.json',
          dataType: 'jsonp',
          success : function(result) {
            inputForm.getComponent('PostalCode').setValue(result.zipcode.substring(0,3)+'-'+result.zipcode.substring(3));
            inputForm.getComponent('State').setValue(result.address.prefecture);
            inputForm.getComponent('City').setValue(result.address.city);
            inputForm.getComponent('Street').setValue(result.address.town);
          },
          error : onFailure
        });
      }
    }

    function onFailure() {}
  }


  function handleEmailChange(field, value) {
    if (!value || value.length==0) return;

    var lastName = inputForm.getComponent('LastName').getValue();
    var company = inputForm.getComponent('Company').getValue();
    var email = inputForm.getComponent('Email').getValue();

    sforce.connection.query(
      "SELECT "+fields.join(',')+" FROM Lead "+
      " WHERE Email = '"+email+"' "+
      " OR (Company = '"+company+"' AND LastName = '"+lastName+"') "+
      " LIMIT 10",
      { onSuccess : onSuccess, onFailure : onFailure }
    );

    function onSuccess(result) {
      var records = $.map(result.getArray('records'), function(lead) {
        var record = [];
        $.each(fields, function() { record.push(lead[this] || '') }); 
        return [record];
      });
      if (records.length>0) {
        dupStore.loadData(records);
        console.log(field.getEl());
        dupTip.showBy(field.getEl(), 'tl-tr');
      }
    }

    function onFailure() {
      console.log(arguments);
    }

  }

  function handleDupDblclick(grid, index) {
    var record = grid.getStore().getAt(index);
    inputForm.items.each(function(field) {
      var value = record.get(field.getItemId());
      if (value) field.setValue(value);
    })
    dupTip.hide();
  }

  function save() {

    var lead = new sforce.SObject('Lead');
    inputForm.items.each(function(field) {
      var value = field.getValue();
      if (value && value.length>0) {
        lead[field.getItemId()] = value;
      }
    });

    sforce.connection[lead.Id ? 'update' : 'create']([lead], {
      onSuccess : onSuccess, 
      onFailure : onFailure
    });

    inputForm.disable();

    function onSuccess(results) {
      inputForm.enable();
      var res = results[0];
      if (res.getBoolean('success')) {
        clear();
      } else {
        var error = res.getArray('errors')[0];
        Ext.Msg.alert('', error.message, function() {
          var field = error.getArray('fields')[0];
          if (field) inputForm.getComponent(field).focus(true);
        });
      }
    }

    function onFailure(result) {
      inputForm.enable();
    }

  }

  function clear() {
    inputForm.getForm().reset();
    var field = inputForm.items.itemAt(0);
    field.focus();
    dupTip.hide();
  }

  clear();

});
