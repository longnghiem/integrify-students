if (document.querySelector('#add-skill')) {
  document.querySelector('#add-skill').onclick = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'skills';
    document.querySelector('#inputs').appendChild(document.createElement('br'));
    document.querySelector('#inputs').appendChild(input);
  };
}
  
/* if (document.querySelector('#delete-button')) {
  document.querySelector('#delete-button').onclick = () => {
    const student_id = document.querySelector('#delete-button').getAttribute('data_id');

    //after firing a Delete request, we receive a response including "status"="deleted" that was manually created
    fetch(`/student/${student_id}`, {
      method: 'DELETE'
    }).then( (response) => {
      return response.json()
    }).then((result) => {
      if(result.status == "Deleted") {
        window.location.replace('http://localhost:3009/');
      }
    });
  };
} */
