import { useState } from "react";
import ListItem from "./ListItem";

import { gql, useMutation, useQuery } from "@apollo/client";
import PassengerInput from "./PassengerInput";

const GetPenumpang = gql`
    query MyQuery {
        anggota {
            nama
            umur
            jenisKelamin
        }
      }
    `;

const subscriptionpenumpang = gql`
    subscription MySubscription {
      anggota {
        id
        nama
        umur
        jenisKelamin
      }
  }
  `;

const DeleteUser = gql`
    mutation MyMutation($id: Int!) {
      delete_anggota_by_pk(id: $id) {
        id
      }
    }
  `;

const InsertUser = gql`
  mutation MyMutation($object: anggota_insert_input!) {
    insert_anggota_one(object: $object) {
      id
    }
  }
`;

const ListPassenger = () => {
    // const {data, error} = useQuery(GetPenumpang);
    const {data, error} = useSubscription(subscriptionpenumpang);

    const [nama, setNama] = useState("");
    const [umur, setUmur] = useState("");
    const [jenis_kelamin, setJenisKelamin] = useState("");
    const [userId, setUserId] = useState(0);
    const [editing, setEditing] = useState(true);

    const [deleteUser, { loading: loadingDelete }] = useMutation(DeleteUser, {
        refetchQueries: [subscriptionpenumpang],
    });
    const [insertUser, { loading: loadingInsert }] = useMutation(InsertUser, {
        refetchQueries: [subscriptionpenumpang],
    });
    
    if (error) {
        console.log(error)
        return null
    }

    const hapusPengunjung = (idx) => {
        deleteUser({
          variables: {
            id: idx,
          },
        });
    };

    const tambahPengunjung = (e) => {
        insertUser({
          variables: {
            object: {
              nama: nama,
              umur: umur,
              jenis_kelamin: jenis_kelamin,
            },
          },
        });
    };

    const onChangeUserId = (e) => {
        if (e.target) {
          setUserId(e.target.value);
        }
    };

    const onChangeNama = (e) => {
        if (e.target) {
          setNama(e.target.value);
        }
    };

    const onChangeUmur = (e) => {
        if (e.target) {
          setUmur(e.target.value);
        }
    };

    const onChangeGender = (e) => {
        if (e.target) {
          setJenisKelamin(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        if (nama.trim() && umur && jenis_kelamin) {
          if (umur >= 75 || umur <= 12) {
            alert("Umur tidak sesuai");
          } else {
            const newData = {
              nama: nama,
              umur: umur,
              jenisKelamin: jenis_kelamin,
              id: userId,
            };
            tambahPengunjung(newData);
    
            setNama("");
            setUmur("");
            setJenisKelamin("");
            // setAnggota({
            //   ...stateAnggota,
            //   nama: "",
            //   umur: "",
            //   jenis_kelamin: "Laki-laki",
            // });
          }
        } else {
          alert("Data masih ada yang kosong");
        }
    };

    const handleBukaInput = () => {
        setEditing(false);
      };

    const handleTutupInput = () => {
        setEditing(true);
    };

    let viewMode = {};
    let editMode = {};
    
    if (editing) {
        viewMode.display = "none";
    } else {
        editMode.display = "none";
    }

    return (
        <>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <thead bgcolor="red">
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {data?.anggota.map((item) => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        data={item}
                        hapusPengunjung={() => hapusPengunjung(item.id)}
                    />
                ))}
            </table>
            <div>
                <PassengerInput
                style={{ textTransform: "capitalizes" }}
                onChangeNama={onChangeNama}
                onChangeUmur={onChangeUmur}
                onChangeGender={onChangeGender}
                handleBukaInput={handleBukaInput}
                handleSubmit={handleSubmit}
                handleTutupInput={handleTutupInput}
                tambahPengunjung={tambahPengunjung}
                nama={nama}
                umur={umur}
                jenis_kelamin={jenis_kelamin}
                viewMode={viewMode}
                editMode={editMode}
            />
            </div>
        </>
    )
  }

export default ListPassenger;