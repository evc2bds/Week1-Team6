import React from 'react';

class ImportantLinks extends React.Component {
    render() {
       return(
           <div>
               <h2 style={{textAlign: "left", padding: 10, paddingLeft: 30, fontSize: 24}}>Quick Links</h2>
                <QuickLinks />
           </div>
       ); 
    }
}

class QuickLinks extends React.Component {
    render() {
        return(
            <div style={{borderThickness: 1, borderStyle: "solid", margin: 30,}}>
                <p>TODO: IMPLEMENT LINKS TO OTHER PAGES</p>
            </div>
        );
    }
}

export default ImportantLinks