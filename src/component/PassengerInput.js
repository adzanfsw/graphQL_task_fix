import { useState } from "react"
function PassengerInput(props) {
  const {
    nama,
    umur,
    jenisKelamin,
    handleBukaInput,
    handleSubmit,
    handleTutupInput,
    onChangeNama,
    onChangeUmur,
    onChangeGender,
    viewMode,
    editMode,
  } = props;

  return (
    <div>
      <div onSubmit={handleSubmit} style={viewMode}>
        <p>Masukkan Nama Anda</p>
        <input
          type="text"
          className="input-text"
          placeholder="Nama anda ..."
          // value={nama}
          style={{ textTransform: "capitalizes" }}
          name={nama}
          onChange={onChangeNama}
        />
        <p>Masukkan Umur Anda</p>
        <input
          type="number"
          className="input-text"
          placeholder="Umur anda ..."
          // value={umur}
          name={umur}
          onChange={onChangeUmur}
        />
        <p>Masukkan Jenis Kelamin Anda</p>
        <select
          onChange={onChangeGender}
          defaultValue="Laki-laki"
          name={jenisKelamin}
        >
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        <p></p>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleTutupInput} style={{ marginLeft: "10px" }}>
          Selesai
        </button>
      </div>
    </div>
  );
}

export default PassengerInput;
