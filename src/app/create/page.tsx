import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import MainLayout from "../_components/MainLayout";
import { invitationRouter } from '../../server/api/routers/invitation';

interface InvitationForm {
  guestName: string;
  startDate: string;
  endDate: string;
  spaceId: number;
  createdBy: string;
}

export default async function Home() {
  const session = await getServerAuthSession();
  const navigate = useNavigate();

  if (!session) {
    redirect("/api/auth/login");
  }

  const { register, handleSubmit, formState: { errors } } = useForm<InvitationForm>();

  const onSubmit: SubmitHandler<InvitationForm> = async (data) => {
    try {
      // Crear la invitación utilizando tRPC
      const response = await invitationRouter.createInvitation({
        ctx: undefined,
        rawInput: undefined,
        path: "",
        type: "query"
      });
  
      // Redireccionar a la página de lista de invitaciones
      navigate("/invitations");
    } catch (error) {
      console.error("Error al crear la invitación", error);
    }
  };


  return (
    <main className="">
      <MainLayout title="Create Invitation">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nombre del invitado</label>
            <input type="text" {...register("guestName", { required: true })} />
            {errors.guestName && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label>Fecha de inicio</label>
            <input type="date" {...register("startDate", { required: true })} />
            {errors.startDate && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label>Fecha de fin</label>
            <input type="date" {...register("endDate", { required: true })} />
            {errors.endDate && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label>ID de espacio</label>
            <input type="number" {...register("spaceId", { required: true })} />
            {errors.spaceId && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label>Creado por</label>
            <input type="text" {...register("createdBy", { required: true })} />
            {errors.createdBy && <span>Este campo es requerido</span>}
          </div>
          <button type="submit">Crear invitación</button>
        </form>
      </MainLayout>
    </main>
  );
}
