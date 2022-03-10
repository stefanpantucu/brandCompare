import React, { Component, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TRow from './TRow';

export default function Form() {

  const [selectedDate, setSelectedDate] = useState(new Date())

  const [brands, setBrands] = useState([]);
  const [profiles, setProfiles] = useState(0);

  let followers = [];
  let engagement = [];
  let sum_fans = 0;
  let sum_engagement = 0;

  useEffect(() => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let reqBody = JSON.stringify({ "apikey":"API_KEY_TEST","method" : "socialinsider_api.get_brands", "params":{ "projectname": "API_test" } });

      let reqOptions = {
          method: 'POST',
          headers: myHeaders,
          body: reqBody,
          redirect: 'follow'
      }

      fetch("http://localhost:5100/requests", reqOptions)
          .then(response => response.json())
          .then(res => setBrands(res.result));
  }, [selectedDate]);

  useEffect(() => {
    brands.forEach(brand => {
      

      brand.profiles.forEach(profile => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let reqOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: 1,
            method: "socialinsider_api.get_profile_data",
            params: {
              id: profile.id,
              profile_type: profile.profile_type,
              date: {
                start: (selectedDate.getTime()),
                end: (selectedDate.getTime() + 10000000),
      
                timezone: "Europe/London"
              }
            }
        })
        }

      fetch("http://localhost:5100/requests", reqOptions)
      .then(response => response.json())
      .then(res => {

        for (let key in res.resp[profile.id]) {
          let noFans = res.resp[profile.id][key].fans;
          let noEngagement = res.resp[profile.id][key].engagement;


          if (noFans != null) {
            sum_fans += noFans
          }

          if (noEngagement != null)
            sum_engagement += noEngagement

        }

      });
    });
    followers.push(sum_fans)
    engagement.push(sum_engagement)

      })
  }, [brands]);

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <form onSubmit={ (e) => {
          e.preventDefault();

          console.log(followers)
          // console.log(engagement)
          console.log(brands)

        } }>
            <div className="form-group">
            <DatePicker
                selected={ selectedDate }
                onChange={ setSelectedDate }
                name="startDate"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
            />
            <button className="btn btn-primary">Submit</button>
            {(brands.length > 0) ? (
              <table >
              <thead>
                  <tr>
                  <th>#</th>
                  <th>Brand Name</th>
                  <th>Total Profiles</th>
                  <th>Total Followers</th>
                  <th>Total Engagement</th>
                  </tr>
              </thead>
              <tbody>
              {brands.map((value, index) => {
                                return <TRow
                                        index={index + 1}
                                        name={value.brandname}
                                        profiles={value.profiles.length}
                                        followers={followers[index]}
                                        engagement={engagement[index]}
                                />;
                            })}
              </tbody>
          </table>
            ) : ' '}
            </div>
        </form>
    </div>
);

}

