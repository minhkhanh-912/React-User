import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { CSVDownload, CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import userApi from "../api/userApi";
import ModalAddnew from "./ModalAddnew";
import Papa from "papaparse";
const itemsPerPage = 5;
const TableUser = () => {
  const [users, setusers] = useState([]);
  const [totalPages, settotalPages] = useState(0);
  const [nextpage, setnextpage] = useState(1);
  const [dataedit, setdataedit] = useState({});
  const [dataExport, setdataExport] = useState([]);
  useEffect(() => {
    async function getdata() {
      const response = await userApi.getUsers({
        page: nextpage,
        per_page: itemsPerPage,
      });
      if (response && response.data) {
        setusers(response.data);
        settotalPages(response.total_pages);
      }
    }
    getdata();
  }, [nextpage]);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setnextpage(+event.selected + 1);
  };

  const [show, setshow] = useState(false);
  const handleClose = () => {
    setshow(false);
    setdataedit({});
  };

  const handleUpdateUser = (user) => {
    setusers([user, ...users]);
  };

  const handleEdit = (user) => {
    setdataedit(user);
    setshow(true);
  };

  const handleDelete = async (id) => {
    const res = await userApi.DeleteUser(id);
    if (res) {
      const Newuser = users.filter((user) => user.id !== id);
      setusers(Newuser);
    }
  };

  const getUsers = (event, done) => {
    let results = [];
    if (users && users.length > 0) {
      results.push(["ID", "First Name", "Last Name", "Email"]);
      users.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.first_name;
        arr[2] = item.last_name;
        arr[3] = item.email;
        results.push(arr);
      });
      setdataExport(results);
      done();
    }
  };

  const handleImportFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "text/csv") alert("ko tim thay file");

      Papa.parse(file, {
        complete: function (results) {
          let rowSCV = results.data;
          if (rowSCV.length > 0) {
            if (rowSCV[0] && rowSCV[0].length === 3) {
              if (
                rowSCV[0][0] !== "Firt name" ||
                rowSCV[0][1] !== "Last name" ||
                rowSCV[0][2] !== "Email"
              ) {
                let results = [];
                rowSCV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.first_name = item[0];
                    obj.last_name = item[1];
                    obj.email = item[2];
                    results.push(obj);
                  }
                  setusers(results);
                });
                console.log(rowSCV);
              } else {
                alert("ko tim thay file");
              }
            } else {
              alert("ko tim thay file");
            }
          }
          console.log(results);
          // executed after all files are complete
        },
      });
    }
  };
  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>List Users:</span>
        <span className="d-flex gap-2">
          <label htmlFor="user" className="btn btn-warning">
            Import
          </label>
          <input
            id="user"
            type="file"
            hidden
            onChange={handleImportFile}></input>
          <CSVLink
            data={dataExport}
            className="btn btn-primary"
            filename={"users.csv"}
            asyncOnClick={true}
            onClick={getUsers}>
            Export
          </CSVLink>
          <Button className="btn btn-success" onClick={() => setshow(true)}>
            Add new user
          </Button>
        </span>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="gap-1 d-flex">
              #{" "}
              <span className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  style={{ width: "20px" }}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ width: "20px" }}
                  strokeWidth="1.5"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                  />
                </svg>
              </span>
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user?.id}</td>
                <td>{user?.first_name}</td>
                <td>{user?.last_name}</td>
                <td>{user?.email}</td>
                <td>
                  <Button
                    className="mx-3 btn btn-info"
                    onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      />
      <ModalAddnew
        show={show}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
        dataEdit={dataedit ? dataedit : ""}></ModalAddnew>
    </>
  );
};

export default TableUser;
