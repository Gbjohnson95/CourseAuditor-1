'use strict';

riot.tag2('app', '<div if="{!this.audit}">Loading... hold on...</div> <div if="{this.audit}"> <h1>Score: {this.analysis.points}</h1> <table> <thead> <tr> <th>Total Pages</th> <th>Broken Links</th> <th>Saturdays</th> </tr> </thead> <tbody> <tr> <td>{this.analysis.totalPages}</td> <td>{this.analysis.brokenLinks}</td> <td>{this.analysis.saturdays}</td> </tr> </tbody> </table> </div> <entry each="{entry in this.audit}" data="{entry}"></entry>', '', '', function (opts) {
  var _this = this;

  var courseId = Number(window.location.href.split('/')[5].split('-')[0]),
      errors = [];

  Auditor.checkCourse(courseId, function (audit, analysis) {
    _this.update({ audit: audit, analysis: analysis });
  });
}, '{ }');
'use strict';

riot.tag2('entry', '<h2>{entry.title}</h2> <div class="meta"> <a href="{entry.brightspace}" target="_blank">View in Brightspace</a> <a href="{entry.contentpage}" target="_blank">Goto Content Page</a> <div class="errors"> <span class="error" each="{name, obj in entry.errors}"><strong>{obj.count}</strong> {name}</span> </div> </div>', 'entry:hover { background: rgba(0, 0, 0, 0.2); } entry h2 { margin-bottom: 10px; font-weight: normal; font-size: 1.5rem; padding: 0px 20px; } entry:not(:first-child) { border-top: 1px solid #ccc; } entry .meta { display: none; } entry.open { box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3); border: 1px solid #ccc; } entry.open .meta { display: block; } entry .errors { border-radius: 3px; box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1) inset; background: #f5ff6a; padding: 8px 20px; } entry .errors .error { display: inline-block; padding: 0px 20px; }', 'onclick="{open}"', function (opts) {
  var _this = this;

  this.entry = this.opts.data;

  this.open = function (e) {
    if ($(e.target).attr('href')) return true;else $(_this.root).toggleClass('open');
  };
}, '{ }');