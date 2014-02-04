/**
 * Copyright (c) MuleSoft, Inc.  All rights reserved.  http://www.mulesoft.com
 */

'use strict';

var logger = require('winston');
var should = require("should");
var sessions = require('..')({});

describe('Session tests' , function () {

    before(function (done) {
        // do something

        done();
    });

    it('create, read, update, delete' , function (done) {

        // define the initial session state
        var initial_session_state = { access_token : 'abcde' };

        // put the initial session state
        sessions.create(initial_session_state , function (err , created_session_state) {

            // validate the put was successful
            should.exist(created_session_state);

            should.exist(created_session_state._id);
            should.exist(created_session_state.access_token);
            created_session_state.access_token.should.eql(initial_session_state.access_token);

            // get the saved
            sessions.read(created_session_state._id , function (err , read_session_state) {

                should.exist(read_session_state);

                should.exist(read_session_state._id);
                read_session_state._id.should.eql(created_session_state._id);
                should.exist(read_session_state.access_token);
                read_session_state.access_token.should.eql(initial_session_state.access_token);

                read_session_state.foo = 'bar';

                sessions.update(read_session_state , function (err , updated_session_state) {

                    should.exist(updated_session_state);

                    should.exist(updated_session_state._id);
                    updated_session_state._id.should.eql(created_session_state._id);

                    should.exist(updated_session_state.access_token);
                    updated_session_state.access_token.should.eql(created_session_state.access_token);

                    should.exist(updated_session_state.foo);
                    updated_session_state.foo.should.eql('bar');

                    sessions.delete(created_session_state._id , function (err) {

                        // check to make sure it was actually deleted
                        sessions.read(created_session_state._id , function (err , deleted_session_state) {
                            should.not.exist(deleted_session_state);
                            done();
                        });
                    });
                });
            });
        });
    });

    after(function () {
        // do something
    });
});


