import React from 'react'

function FlightTable() {
    return (
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-md m-4">
          <h1 className="text-xl font-bold mb-4">Járatok</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Járat</th>
                <th className="border px-4 py-2">Hely</th>
                <th className="border px-4 py-2">Idő</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">001</td>
                <td className="border px-4 py-2">Föld</td>
                <td className="border px-4 py-2">12:00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">002</td>
                <td className="border px-4 py-2">Mars</td>
                <td className="border px-4 py-2">14:30</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">003</td>
                <td className="border px-4 py-2">Jupiter</td>
                <td className="border px-4 py-2">16:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
}

export default FlightTable