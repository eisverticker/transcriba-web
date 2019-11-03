"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var backend_helper_1 = require("../utilities/backend-helper");
var auth_service_1 = require("../loopback-auth/auth.service");
var core_1 = require("@angular/core");
var transcriba_object_1 = require("./transcriba-object");
var revision_1 = require("./revision");
var collection_1 = require("./collection");
var TranscribaService = (function () {
    function TranscribaService(http, backend, auth) {
        this.http = http;
        this.backend = backend;
        this.auth = auth;
    }
    /**
     * Returns the TranscribaObject with the given id as Promise
     */
    TranscribaService.prototype.loadByID = function (id) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + id, token);
        return this.http.get(url)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (o) {
            return new transcriba_object_1.TranscribaObject(o.title, o.externalID, o.sourceId, o.discussionId, o.id, o.status);
        });
    };
    /**
     * Get number of objects in the database
     * you can also specify a search term if you only want to
     * count objects with a title containing the search term
     * (usefull for explorer)
     */
    TranscribaService.prototype.loadObjectCount = function (searchTerm) {
        var token = this.auth.token;
        var searchFilter;
        if (searchTerm && searchTerm.length > 1) {
            searchFilter = 'where[title][like]=' + searchTerm;
        }
        else {
            searchFilter = '';
        }
        var url = this.backend.authUrl('TranscribaObjects/count', token, searchFilter);
        return this.http.get(url)
            .map(function (data) { return data.json().count; })
            .toPromise();
    };
    /**
     * Removes an object from the database
     */
    TranscribaService.prototype.delete = function (obj) {
        throw 'not implemented yet';
    };
    /**
     * Returns all users who are considered participants of the object
     */
    TranscribaService.prototype.loadParticipatingUsers = function (user) {
        throw 'not implemented yet';
    };
    /**
     * Loads a collection of objects
     */
    TranscribaService.prototype.loadCollectionByID = function (id) {
        return Promise.resolve(collection_1.Collection.createEmptyCollection());
    };
    /**
     * Imports an object by his source and his id at
     * the specified source (external id)
     */
    TranscribaService.prototype.import = function (source, foreignID) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/import', token);
        return this.http.post(url, {
            'sourceId': source.id,
            'externalId': foreignID
        })
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    TranscribaService.prototype.addObjectToCollection = function (target, obj) {
        return Promise.resolve(null);
    };
    TranscribaService.prototype.addCollectionToCollection = function (target, item) {
        return Promise.resolve(null);
    };
    /**
     * Loads an array of objects which belong to the given page
     */
    TranscribaService.prototype.loadObjectPage = function (page, itemsPerPage, searchTerm, rootCollection, status) {
        var token = this.auth.token;
        var filters = 'filter[order]=createdAt DESC' +
            '&filter[limit]=' + itemsPerPage +
            '&filter[skip]=' + itemsPerPage * page;
        if (searchTerm) {
            filters += '&filter[where][title][like]=' + searchTerm;
        }
        if (status) {
            filters += '&filter[where][status]=' + status;
        }
        var url = this.backend.authUrl('TranscribaObjects', token, filters);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (objects) {
            return objects.map(function (data) {
                return new transcriba_object_1.TranscribaObject(data.title, data.externalID, data.sourceId, data.discussionId, data.id, data.status);
            });
        });
    };
    TranscribaService.prototype.loadObjectPageFromCollection = function (page, itemsPerPage, collectionId, searchTerm) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Collections/' + collectionId + '/transcribaObjects', token, 'filter[order]=createdAt DESC' +
            // "&filter[include]=appUser"
            '&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (objects) {
            return objects.map(function (data) {
                return new transcriba_object_1.TranscribaObject(data.title, data.externalID, data.sourceId, data.discussionId, data.id, data.status);
            });
        });
    };
    TranscribaService.prototype.loadCollectionPage = function (page, itemsPerPage, rootCollection) {
        var token = this.auth.token;
        var url = this.backend.authUrl('Collections', token, 'filter[order]=createdAt DESC' +
            // "&filter[include]=appUser"
            '&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (collections) {
            console.log(collections);
            return collections.map(function (data) {
                return new collection_1.Collection(data.name, data.description, data.public, data.locked, data.id);
            });
        });
    };
    /**
     * Loads the revision chronic of a TranscribaObject with the given id
     */
    TranscribaService.prototype.loadChronic = function (objId) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + objId + '/chronic', token);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    /*loadNumOfRevisions(objId: any): Promise<number>{
      return Promise.resolve(0);
    }*/
    TranscribaService.prototype.loadLatestRevision = function (objId) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + objId + '/latest', token);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (data) { return new revision_1.Revision(data.id, data.approved, data.createdAt, data.metadata, data.content, data.published, data.ownerId); });
    };
    /**
     * Returns the latest stable revision of an object
     */
    TranscribaService.prototype.loadStableRevision = function (objId) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + objId + '/stable', token);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise()
            .then(function (data) { return new revision_1.Revision(data.id, data.approved, data.createdAt, data.metadata, data.content, data.published, data.ownerId); });
    };
    /**
     * Returns the latest revision (including unpublished and not yet accepted ones)
     */
    TranscribaService.prototype.loadLatestRevisionPermissions = function (objId) {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/' + objId + '/latest/permissions', token);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    /**
     * If the user is in busy state then he is currently working on some object
     * revision. This method returns that object
     */
    TranscribaService.prototype.loadCurrentlyOccupiedObject = function () {
        var token = this.auth.token;
        var url = this.backend.authUrl('TranscribaObjects/occupied', token);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    TranscribaService.prototype.isUserBusy = function () {
        var token = this.auth.token;
        var url = this.backend.authUrl('AppUsers/busy', token);
        return this.http.get(url)
            .timeout(5000)
            .map(function (data) { return data.json(); })
            .toPromise();
    };
    return TranscribaService;
}());
TranscribaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        backend_helper_1.BackendHelper,
        auth_service_1.AuthService])
], TranscribaService);
exports.TranscribaService = TranscribaService;
//# sourceMappingURL=transcriba.service.js.map