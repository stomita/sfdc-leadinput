/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.UpdateManager.defaults.indicatorText="<div class=\"loading-indicator\">Notiek iel�?de...</div>";if(Ext.View){Ext.View.prototype.emptyText=""}if(Ext.grid.Grid){Ext.grid.Grid.prototype.ddText="{0} iezīmētu rindu"}if(Ext.TabPanelItem){Ext.TabPanelItem.prototype.closeText="Aizver šo zīmni"}if(Ext.form.Field){Ext.form.Field.prototype.invalidText="Vērtība šaj�? lauk�? nav pareiza"}if(Ext.LoadMask){Ext.LoadMask.prototype.msg="Iel�?dē..."}Date.monthNames=["Janv�?ris","Febru�?ris","Marts","Aprīlis","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"];Date.dayNames=["Svētdiena","Pirmdiena","Otrdiena","Trešdiena","Ceturtdiena","Piektdiena","Sestdiena"];if(Ext.MessageBox){Ext.MessageBox.buttonText={ok:"Labi",cancel:"Atcelt",yes:"J�?",no:"Nē"}}if(Ext.util.Format){Ext.util.Format.date=function(A,B){if(!A){return""}if(!(A instanceof Date)){A=new Date(Date.parse(A))}return A.dateFormat(B||"d.m.Y")}}if(Ext.DatePicker){Ext.apply(Ext.DatePicker.prototype,{todayText:"Šodiena",minText:"Nor�?dītais datums ir maz�?ks par minim�?lo datumu",maxText:"Nor�?dītais datums ir liel�?ks par maksim�?lo datumu",disabledDaysText:"",disabledDatesText:"",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"N�?kamais mēnesis (Control+pa labi)",prevText:"Iepriekšējais mēnesis (Control+pa kreisi)",monthYearText:"Mēneša izvēle (Control+uz augšu/uz leju lai p�?rslēgtu gadus)",todayTip:"{0} (Tukšumzīme)",format:"d.m.Y",startDay:1})}if(Ext.PagingToolbar){Ext.apply(Ext.PagingToolbar.prototype,{beforePageText:"Lapa",afterPageText:"no {0}",firstText:"Pirm�? lapa",prevText:"iepriekšēj�? lapa",nextText:"N�?kam�? lapa",lastText:"Pēdēj�? lapa",refreshText:"Atsvaidzin�?t",displayMsg:"R�?da no {0} līdz {1} ierakstiem, kop�? {2}",emptyMsg:"Nav datu, ko par�?dīt"})}if(Ext.form.TextField){Ext.apply(Ext.form.TextField.prototype,{minLengthText:"Minim�?lais garums šim laukam ir {0}",maxLengthText:"Maksim�?lais garums šim laukam ir {0}",blankText:"Šis ir oblig�?ts lauks",regexText:"",emptyText:null})}if(Ext.form.NumberField){Ext.apply(Ext.form.NumberField.prototype,{minText:"Minim�?lais garums šim laukam ir  {0}",maxText:"Maksim�?lais garums šim laukam ir  {0}",nanText:"{0} nav pareizs skaitlis"})}if(Ext.form.DateField){Ext.apply(Ext.form.DateField.prototype,{disabledDaysText:"Atspējots",disabledDatesText:"Atspējots",minText:"Datumam šaj�? lauk�? j�?būt liel�?kam k�? {0}",maxText:"Datumam šaj�? lauk�? j�?būt maz�?kam k�? {0}",invalidText:"{0} nav pareizs datums - tam j�?būt š�?d�? form�?t�?: {1}",format:"d.m.Y"})}if(Ext.form.ComboBox){Ext.apply(Ext.form.ComboBox.prototype,{loadingText:"Iel�?dē...",valueNotFoundText:undefined})}if(Ext.form.VTypes){Ext.apply(Ext.form.VTypes,{emailText:"Šaj�? lauk�? j�?ieraksta e-pasta adrese form�?t�? \"lietot�?s@domēns.lv\"",urlText:"Šaj�? lauk�? j�?ieraksta URL form�?t�? \"http:/"+"/www.domēns.lv\"",alphaText:"Šis lauks drīkst saturēt tikai burtus un _ zīmi",alphanumText:"Šis lauks drīkst saturēt tikai burtus, ciparus un _ zīmi"})}if(Ext.grid.GridView){Ext.apply(Ext.grid.GridView.prototype,{sortAscText:"K�?rtot pieaugoš�? secīb�?",sortDescText:"K�?rtot dilstoš�? secīb�?",lockText:"Noslēgt kolonnu",unlockText:"Atslēgt kolonnu",columnsText:"Kolonnas"})}if(Ext.grid.PropertyColumnModel){Ext.apply(Ext.grid.PropertyColumnModel.prototype,{nameText:"Nosaukums",valueText:"Vērtība",dateFormat:"j.m.Y"})}if(Ext.layout.BorderLayout.SplitRegion){Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype,{splitTip:"Velc, lai mainītu izmēru.",collapsibleSplitTip:"Velc, lai mainītu izmēru. Dubultklikšķis noslēpj apgabalu."})};