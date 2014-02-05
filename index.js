/**
 * Copyright (c) 2013 Alex Thieme  All rights reserved.
 */

var logger = require('winston');
var uuid = require('node-uuid');
var underscore = require('underscore');

module.exports = function () {

    var result = {};

    var sessions = {};

    /**
     * Persists the session state giving it a session_id
     * @param session_state the session state
     * @param done  callback for when the session state is persisted
     */
    result.create = function (session_state , done) {
        // I clone the object because this in-memory version would
        // otherwise have side effects after changing session state
        // but before calling update and therefore this implementation
        // would likely differ from a persistent session store that
        // requires calling update after a state change
        var cloned = underscore.clone(session_state);
        cloned._id = uuid.v4();
        result.update(cloned , done);
    };

    /**
     * Retrieves the session state for the given id
     * @param session_id the session id
     * @param done callback for when the session state is retrieved
     */
    result.read = function (session_id , done) {
        done(null, sessions[session_id]);
    };

    /**
     * Updates the session state for the given session id
     * @param session_state the new session state
     * @param done  callback for when the session state is retrieved
     */
    result.update = function (session_state , done) {
        sessions[session_state._id] = session_state;
        done(null, session_state);
    }

    /**
     * Deletes the session state for the given id
     * @param session_id    the session id
     */
    result.delete = function (session_id, done) {
        delete sessions[session_id];
        done(null);
    };

    return result;
}

