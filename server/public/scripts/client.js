var myApp = angular.module('myApp', ['ngRoute','ngMaterial','xeditable']);

 // Routes
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
  .when('/home', {
    templateUrl: '/views/templates/home.html',
    controller: 'HomeController as hc',
  })
  .when('/events/add', {
    templateUrl: '/views/templates/admin/newEvent.html',
    controller: 'EventController as ec',
  })
  .when('/events/checkIn', {
    templateUrl: '/views/templates/admin/eventCheckIn.html',
    controller: 'EventCheckInController as ecic',
  })
  .when('/volunteers', {
    templateUrl: '/views/templates/volunteer/volunteers.html',
    controller: 'VolunteersController as vc',
  })
  .when('/customers', {
    templateUrl: '/views/templates/customer/customerRSVP.html',
    controller: 'CustomerController as cc',
  })
  .when('/events', {
    templateUrl: '/views/templates/admin/eventList.html',
    controller: 'EventController as ec',
})
  .when('/volunteerProfile', {
    templateUrl: '/views/templates/volunteer/volunteerProfile.html',
    controller: 'VolunteersController as vc',
  })
  .when('/volunteers/add', {
    templateUrl: '/views/templates/admin/addVolunteers.html',
    controller: 'VolunteersController as vc',
  })
  .when('/events/rsvp', {
    templateUrl: '/views/templates/admin/eventRSVP.html',
  })
  .when('/about', {
    templateUrl: '/views/templates/Footer/about.html',
    controller: 'VolunteersController as vc',
  })
  .when('/resources', {
    templateUrl: '/views/templates/Footer/resources.html',
    controller: 'VolunteersController as vc',
  })
  .when('/sponsors', {
    templateUrl: '/views/templates/Footer/sponsors.html',
    controller: 'VolunteersController as vc',
  })
  .when('/skills', {
    templateUrl: '/views/templates/admin/volunteerSkills.html',
    controller: 'SkillsController as sc',
  })
    .otherwise({
      redirectTo: 'home'
    });
});
