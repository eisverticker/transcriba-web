"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// components
var import_form_component_1 = require("./import-form.component");
var explorer_component_1 = require("./explorer.component");
var object_detail_component_1 = require("./object-detail.component");
var revision_history_component_1 = require("./revision-history.component");
var transcription_viewer_component_1 = require("./transcription-viewer.component");
var overview_component_1 = require("./overview.component");
var voting_suggestion_component_1 = require("./voting-suggestion.component");
var busy_widget_component_1 = require("./busy-widget.component");
// modules
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var i18n_module_1 = require("../i18n/i18n.module");
var utility_module_1 = require("../utilities/utility.module");
var auth_module_1 = require("../loopback-auth/auth.module");
var gadget_module_1 = require("../gadgets/gadget.module");
var http_1 = require("@angular/http");
var source_module_1 = require("../source/source.module");
var discussion_module_1 = require("../discussion/discussion.module");
var score_module_1 = require("../score/score.module");
var editor_module_1 = require("../editor/editor.module");
var image_viewer_module_1 = require("../image-viewer/image-viewer.module");
var voting_module_1 = require("../voting/voting.module");
// services
var transcriba_service_1 = require("./transcriba.service");
var transcription_service_1 = require("./transcription.service");
var revision_voting_service_1 = require("./revision-voting.service");
// routing
var transcriba_routing_1 = require("./transcriba.routing");
var TranscribaModule = (function () {
    function TranscribaModule() {
    }
    return TranscribaModule;
}());
TranscribaModule = __decorate([
    core_1.NgModule({
        declarations: [
            import_form_component_1.ImportFormComponent,
            explorer_component_1.ExplorerComponent,
            object_detail_component_1.ObjectDetailComponent,
            revision_history_component_1.RevisionHistoryComponent,
            overview_component_1.OverviewComponent,
            transcription_viewer_component_1.TranscriptionViewerComponent,
            voting_suggestion_component_1.VotingSuggestionComponent,
            busy_widget_component_1.BusyWidgetComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            i18n_module_1.I18nModule,
            http_1.HttpModule,
            utility_module_1.UtilityModule,
            auth_module_1.AuthModule,
            source_module_1.SourceModule,
            router_1.RouterModule,
            gadget_module_1.GadgetModule,
            discussion_module_1.DiscussionModule,
            transcriba_routing_1.transcribaRouting,
            score_module_1.ScoreModule,
            editor_module_1.EditorModule,
            image_viewer_module_1.ImageViewerModule,
            voting_module_1.VotingModule
        ],
        exports: [
            import_form_component_1.ImportFormComponent,
            explorer_component_1.ExplorerComponent,
            revision_history_component_1.RevisionHistoryComponent,
            voting_suggestion_component_1.VotingSuggestionComponent,
            busy_widget_component_1.BusyWidgetComponent
        ],
        bootstrap: [],
        providers: [
            transcriba_service_1.TranscribaService,
            transcription_service_1.TranscriptionService,
            revision_voting_service_1.RevisionVotingService
            // {provide: Window, useValue: window}
        ]
    })
], TranscribaModule);
exports.TranscribaModule = TranscribaModule;
//# sourceMappingURL=transcriba.module.js.map