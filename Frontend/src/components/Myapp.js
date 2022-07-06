import * as React from 'react';
import MyGrid from './MyGrid';
import Footer from './Footer'
import Header from './Header';

function Myapp(){
return (
    <div>
      <div>
        <Header />
      </div>
      <MyGrid />
      <Footer />
    </div>
);
}
export default Myapp;