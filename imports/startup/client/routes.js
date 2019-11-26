import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.login',
  action() {
    this.render('App_body', { main: 'App_login' });
  },
});

FlowRouter.route('/review/', {
  name: 'App.home',
  action() {
    this.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('*', {
  name: 'App.not-found',
  action() {
    this.render('App_body', { main: 'App_notFound' });
  },
});
