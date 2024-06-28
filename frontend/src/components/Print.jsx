const Print = () => {
  return (
    <div id="elementToPrint" className="mt-5">
      <div
        id="storeData"
        className="flex flex-col border-b-[1px] p-2 text-center"
      >
        <div className="font-bold">Hadi Sport Shop x Orlin Apparel</div>
        <span className="text-sm">
          Jalan Hasyim Dirjosubroto No.44, Wangandawa, Kec.Talang, Kab.Tegal
        </span>
      </div>
      <div
        id="invoiceData"
        className="flex justify-between gap-4 border-b-[1px] p-2 text-sm"
      >
        <div>
          <div>Date</div>
          <div>No</div>
          <div>Admin</div>
          <div>Customer</div>
        </div>
        <div>
          <div>: 25 Mei 2024</div>
          <div>: 118902833302</div>
          <div>: Alan Maulana</div>
          <div>: Gojo Satoru</div>
        </div>
      </div>
      <div id="salesData" className="border-b-[1px] p-2">
        <table className="table">
          <thead>
            <tr>
              <th>Prd Name</th>
              <th>Discounts</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Produk 1 yang sangat keren</td>
              <td>10% + 50.000</td>
              <td className="text-end">280,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="total" className="p-2 text-sm">
        <div className="flex justify-between font-bold">
          <div>Total</div>
          <div>Rp. 280,000</div>
        </div>
        <div className="flex justify-between">
          <div>Bayar</div>
          <div>Rp. 300,000</div>
        </div>
        <div className="flex justify-between">
          <div>Kembalian</div>
          <div>Rp. 20,000</div>
        </div>
      </div>
      <div className="p-2 text-center text-sm">
        <div>Barang yang sudah dibeli tidak dapat ditukar kembali</div>
        <div className="font-bold">TERIMA KASIH</div>
        <div className="font-bold">ATAS KUNJUNGAN ANDA</div>
      </div>
    </div>
  );
};

export default Print;
