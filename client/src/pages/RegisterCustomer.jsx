import React from 'react';

const RegisterCustomer = () => {
  return (
    <div className="container-fluid">
      {/* Aside */}
      <aside>
        <div className="top">
          <div className="logo">
            <img src="/static/./images/nex1.webp" alt="" />
          </div>
          <div className="close">
            <span className="material-symbols-sharp">close</span>
          </div>
        </div>
        <div className="sidebar">
          {/* Add your sidebar links here */}
        </div>
      </aside>

      {/* Main */}
      <main>
        <div className="top">
          <h1>Dashboar</h1>
          <div className="date">
            <input type="date" />
          </div>
        </div>
        <section className="info-form1">
          <form method="post" action="">
            {/* Add your form fields here using formik or react-hook-form */}
          </form>
        </section>
      </main>

      {/* Right */}
      <div className="right">
        <div className="top">
          {/* Add your right top section here */}
        </div>

        {/* Recent Orders */}
        <div className="recent-orders">
          <h2>Fee Alerts</h2>
          <table>
            <thead>
              <tr>
                <th>Fee Type</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {/* Add your table rows here */}
            </tbody>
          </table>
        </div>

        {/* Another Recent Orders Section */}
        <div className="recent-orders">
          <h2>Batch View</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Batch</th>
              </tr>
            </thead>
            <tbody>
              {/* Add your table rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
