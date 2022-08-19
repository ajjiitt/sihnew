import React from "react";

export default function AllGroundAuthorities({ name, address }) {
  const [authorities, setAuthorities] = React.useState([
    {
      name: "Ajit",
      address: "0x1234567890123456789012345678901234567890",
    },
  ]);
  return (
    <div className="sm:flex items-center justify-center text-xs">
      {authorities.length !== 0 ? (
        <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {authorities.map((authority, index) => (
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {authority.name}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {authority.address}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-black">
          No Ground Authorities Found
        </div>
      )}
    </div>
  );
}
