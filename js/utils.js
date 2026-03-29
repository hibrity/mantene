// js/utils.js

function formatDate(dateValue) {
  if (!dateValue) return "-";

  let date;

  if (dateValue?.seconds) {
    date = new Date(dateValue.seconds * 1000);
  } else {
    date = new Date(dateValue);
  }

  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("pt-BR");
}

function formatDateTime(dateValue) {
  if (!dateValue) return "-";

  let date;

  if (dateValue?.seconds) {
    date = new Date(dateValue.seconds * 1000);
  } else {
    date = new Date(dateValue);
  }

  if (isNaN(date.getTime())) return "-";

  return `${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
}

function formatCurrency(value) {
  const number = Number(value || 0);

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatPhone(value) {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  }

  return cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
}

function formatCnpj(value) {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})$/,
    "$1.$2.$3/$4-$5"
  );
}

function getInitials(name) {
  if (!name) return "AD";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join("");
}

function showToast(message, type = "success") {
  const existingToast = document.getElementById("repairge-toast");

  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.id = "repairge-toast";

  const bgClass =
    type === "error"
      ? "bg-red-500"
      : type === "warning"
      ? "bg-yellow-500"
      : "bg-emerald-500";

  toast.className = `
    fixed top-5 right-5 z-[9999]
    ${bgClass}
    text-white px-5 py-4 rounded-2xl shadow-2xl
    text-sm font-medium
    animate-[fadeIn_.2s_ease]
  `;

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all .3s ease";

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

function confirmAction(message = "Deseja continuar?") {
  return window.confirm(message);
}

function generateId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

function getStatusBadge(status) {
  switch (status) {
    case "Aberto":
      return `
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
          Aberto
        </span>
      `;

    case "Em Andamento":
      return `
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
          Em Andamento
        </span>
      `;

    case "Concluído":
      return `
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
          Concluído
        </span>
      `;

    case "Removido":
      return `
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
          Removido
        </span>
      `;

    default:
      return `
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
          ${status || "Sem Status"}
        </span>
      `;
  }
}

window.RepairgeUtils = {
  formatDate,
  formatDateTime,
  formatCurrency,
  formatPhone,
  formatCnpj,
  getInitials,
  showToast,
  confirmAction,
  generateId,
  getStatusBadge
};