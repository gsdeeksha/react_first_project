// import React from 'react';
// import './App.css';
// import axios from 'axios';

// class App extends React.Component {
//   state = {
//     fname:'',
//     lname:'',
//     arr:[]
//   }
//   handleclick=(ev)=>{
//     ev.preventDefault()
//     alert('button clicked'+this.state.fname+this.state.lname)
//     var payload = this.state
//     axios.post("http://localhost:4000/notes/add",payload )
//     .then((dat)=>{
//       console.log('status : '+dat.status)
//     })
//     .catch(()=>{console.log('couldnt have data from backend')})
// }

//   handlefn=(e)=>{
//   this.setState({fname:e.target.value})
//   }
//   handleln=(e)=>{
//     this.setState({lname:e.target.value})
//   }

//   componentDidMount(){
//     axios.get("http://localhost:4000/notes")
//     .then((dat)=>{
//       this.setState({arr:dat.data})
//      console.log(this.state.arr)
//     })
//     .catch(()=>{console.log('couldnt have data from backend')})
//   }
//   render(){

//     return (
//       <div className="App">
//           <form className="for">
//           <label htmlFor="fname">First name:</label><br/>
//           <input type="text" id="fname" name="fname" value={this.state.fname} onChange={this.handlefn} /><br/>
//           <label htmlFor="lname">Last name:</label><br/>
//           <input type="text" id="lname" name="lname" value={this.state.lname}  onChange={this.handleln}/><br/>
//           <button onClick={this.handleclick} >Submit</button> 
//           </form>     
//           <hr/>
//           <table id="customers" className="tab">
//           <tr>
//             <th>id</th>
//             <th>First name</th>
//             <th>last name</th>
//           </tr>
       
//             {this.state.arr.map((item)=>{
//               let id,firstname,lastname;
//               id = item._id
//               firstname = item.fname
//               lastname = item.lname
//               return (
//                 <tr>
//                 <td>{id}</td>
//                 <td>{firstname}</td>
//                 <td>{lastname}</td>
//                 </tr>
//                       )
//             })}
           
//           </table>

//       </div>
//     );
  


//   }
// }

// export default App;



import React from 'react';
import axios from 'axios'
import './App.css'

class App extends React.Component{
    state={
      fname:'',
      lname:'',
      id:'',
      sid:'',
      ye:[],
      arr:[]
    }
 fchange(event){
  this.setState({
    fname:event.target.value
  })
}
lchange(event){
  this.setState({
    lname:event.target.value
  })
}

 onClickHandler=(event)=>{
    event.preventDefault()
   const payload={
     fname:this.state.fname,
     lname:this.state.lname
   }
   axios({
     url:'http://localhost:4000/notes/add',
     method:'POST',
     data: payload
   })
   .then(()=>{
    console.log('Data has been sent to the server');
    alert("data is sent");
  })
   .catch(()=>{
     console.log('Data is not sent');
     alert("data not sent");
   })
 }
 componentDidMount(){
   axios.get('http://localhost:4000/notes')
  
   .then((dat)=>{
    this.setState({arr:dat.data})
    console.log(this.state.arr)
   })
   .catch(()=>{
     console.log('could not retrive data from backend')
   })
  }
  // idchange(e){
  //   this.setState({
  //     id:e.target.value
  //   })
  // }
  idchange(event){
    this.setState({
      id:event.target.value
    })
  }

  sidchange(event){
    this.setState({
      sid:event.target.value
    })
  }
  tosearch=(event)=>{
     console.log('serch func entry')
     event.preventDefault()
     axios.get(`http://localhost:4000/notes/${this.state.sid}`)
     .then((d)=>{
       console.log('Search is working');
       this.setState({ye:d.data})  
       console.log(d);
     })
     .catch(()=>{
       console.log('Search is not working')
     })
  }
  todelete=(e)=>{
    console.log('delete func entry')
    e.preventDefault();
    axios.delete(`http://localhost:4000/notes/delete/${this.state.id}`)
     .then((result)=>{
      console.log(result);
      console.log(result.data);
      console.log('delete is working')
     })
     .catch(()=>{
       console.log('delete is not working')
     })
  }
  render(){
    console.log('state: ',this.state)
    return(
      <div>
        <h2>Welcome to the app</h2>
        <form>
          <div>
            <input type='text' name='fname' value={this.state.fname} onChange={this.fchange.bind(this)}/>
            <br></br>
            <input type='text' name='lname' value={this.state.lname} onChange={this.lchange.bind(this)}/>
            <br></br>
            <button onClick={this.onClickHandler}>Submit</button>
            <br></br>
            <input type='text' name='sid' value={this.state.sid} onChange={this.sidchange.bind(this)}></input>
            <button onClick={this.tosearch}>Search</button><br></br>  
            <input type='text' name='id' value={this.state.id} onChange={this.idchange.bind(this)}></input>
            <button onClick={this.todelete}>Delete</button>
          </div>
        </form>
        <hr/>
        <table className='tab'>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          {this.state.arr.map((item)=>{
            return(
              <tr>
                <td>{item._id}</td>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
              </tr>
            )
          })}
        </table>
        <hr></hr>
        <h4>{this.state.ye._id}, {this.state.ye.fname} , {this.state.ye.lname}</h4>
      </div>
    ) 
  }
}
export default App;
