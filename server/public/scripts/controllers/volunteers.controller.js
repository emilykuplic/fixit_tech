myApp.controller('VolunteersController', function($location, $http, UserAuthService){
  console.log('VolunteersController loaded.');
  var vm = this;

  vm.proficiencies = ['High','Medium','Low','None','Interested in Learning'];
  vm.skillsObject = {};
  vm.skillProfile = {};
  vm.userAuthService = UserAuthService;
  vm.userObject = UserAuthService.userObject;

  getVolunteers();
  getSkills();

  function getVolunteers(){
      console.log( 'in getVolunteers function' );
      // ajax call to server to get tasks
      $http.get('/volunteers').then(function(response){
        vm.volunteersObject = response.data;
        console.log('events.controller vmvolunteersObject', vm.volunteersObject);
      }); // end success
    } // end getVolunteers

    //Edit a Volunteer in the Volunteers table
    vm.editVolunteer = function(people){
      console.log( 'in editVolunteer functon', people);
      $http.put('/volunteers/edit', people).then(function(people){
        getVolunteers();
      }); // end success
    }; // end editVolunteer

    // vm.addVolunteer = function (volunteer){
    //   console.log( 'in addVolunteer function' );
    //   // ajax call to server to get tasks
    //   $http.post('/volunteers/add', volunteer).then(function(response){
    //     console.log('volunteer.controller vm.volunteerObject');
    //   }); // end success
    // };

    vm.volunteerProfileAdd = function (newVolunteer, proficiency){
      console.log( 'in volunteerProfileAdd' );
      console.log(proficiency);
      console.log(newVolunteer);
      $http.post('/volunteers/newVolunteer', newVolunteer).then(function(response){
        console.log('response:', response);
        var newSkillProfile = {};
        newSkillProfile.proficiency = proficiency;
        newSkillProfile.volunteerId = response.data.newVolunteer[0].id;
        console.log('here is the new skill profile:', newSkillProfile);
        $http.post('/volunteers/skill', newSkillProfile).then(function(response){
          console.log('volunteer.controller vm.skill: ', newSkillProfile);
          vm.userAuthService.getuser();
        });
      });
    };

    vm.volunteerProfileAdminAdd = function (newVolunteer, proficiency){
      console.log( 'in volunteerProfileAdd' );
      console.log(proficiency);
      console.log(newVolunteer);
      $http.post('/volunteers/newVolunteer/admin', newVolunteer).then(function(response){
        console.log('response:', response);
        var newSkillProfile = {};
        newSkillProfile.proficiency = proficiency;
        newSkillProfile.volunteerId = response.data.newVolunteer[0].id;
        console.log('here is the new skill profile:', newSkillProfile);
        $http.post('/volunteers/skill', newSkillProfile).then(function(response){
          console.log('volunteer.controller vm.skill: ', newSkillProfile);
          vm.userAuthService.getuser();
        });
      });
    };

    function getSkills(){
        console.log( 'in getVolunteers function' );
        // ajax call to server to get tasks
        $http.get('/volunteers/getSkills').then(function(response){
          vm.skillsObject = response.data;
          console.log('skills object before proficiencies:', vm.skillObject);
          for (var i = 0; i < vm.skillsObject.skills.length; i++) {
            for (var j = 0; j < vm.userObject.skills.length; j++) {
              if (vm.userObject.skills[j].skill_id == vm.skillsObject.skills[i].id) {
                vm.skillsObject.skills[i].proficiency = vm.userObject.skills[j].proficiency_id;
                vm.skillsObject.skills[i].profile_id = vm.userObject.skills[j].id;
              }
            }
            if (vm.skillsObject.skills[i].proficiency === undefined) {
              vm.skillsObject.skills[i].proficiency = '4';
              vm.skillsObject.skills[i].profile_id = undefined;
            }

          }
          console.log('skills object:', vm.skillsObject);
        }); // end success
      } // end getEvents

});
