import type { Invitation } from "@prisma/client";
import { useState, useEffect } from 'react';
import { invitationRouter } from '../../server/api/routers/invitation';


export default function InvitationTable() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await invitationRouter.getAllInvitations({
          ctx: undefined,
          rawInput: undefined,
          path: "",
          type: "query"
        });
        setInvitations(response as Invitation[]);
      } catch (error) {
        console.error('Error al obtener invitaciones', error);
      }
    };
  
    fetchInvitations()
      .catch((error) => {
        console.error('Error al obtener invitaciones', error);
      });
  }, []);

  const cancelInvitation = async (invitationId: number) => {
    try {
      
      await invitationRouter.cancelInvitation({
        rawInput: { id: invitationId }, type: "mutation",
        ctx: undefined,
        path: ""
      });

      const updatedInvitations = invitations.filter(
        (invitation) => invitation.id !== invitationId
      );
      setInvitations(updatedInvitations);
    } catch (error) {
      console.error("Error al cancelar la invitación", error);
    }
  };

  return (
    <div className="my-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Invitaciones
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            cupiditate laboriosam fugiat.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Espacio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Invitado
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Propietario
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
  
                 {invitations.map((invitation) => (
                  <tr key={invitation.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {invitation.spaceId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {invitation.guestName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {invitation.createdById}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href="#"
                        onClick={() => cancelInvitation(invitation.id)}
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-900"
                      >
                        Cancelar
                      </a>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
