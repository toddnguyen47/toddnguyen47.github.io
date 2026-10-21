import Fuse from "fuse.js";

document.addEventListener("DOMContentLoaded", () => {
  loadRoleFind();
});

function loadRoleFind() {
  interface Role {
    id: string;
    name: string;
    reminders?: string[];
    remindersGlobal?: string[];
    edition: string;
  }

  const input =
    document.querySelector<HTMLInputElement>("#role-input") ??
    new HTMLInputElement();
  input.addEventListener("dblclick", () => {
    input.select();
  });

  const suggestionsList =
    document.querySelector<HTMLUListElement>("#role-suggestions");

  const findButton =
    document.querySelector<HTMLButtonElement>("#role-input-button");

  const remindersOutput =
    document.querySelector<HTMLTextAreaElement>("#reminders") ??
    new HTMLTextAreaElement();
  remindersOutput.value = "";

  async function initAutocomplete(): Promise<void> {
    if (!input || !suggestionsList) return;

    const response = await fetch(
      "https://release.botc.app/resources/data/roles.json",
    );
    if (!response.ok) throw new Error("Failed to load roles.json");

    const roles: Role[] = await response.json();

    const fuse = new Fuse(roles, {
      keys: ["name"],
      threshold: 0.4,
    });

    // Combine and display a role's reminders as JSON.
    function displayReminders(role: Role): void {
      const reminders = [
        ...(role.reminders ?? []),
        ...(role.remindersGlobal ?? []),
      ];

      const output = {
        name: role.name,
        edition: role.edition,
        number: reminders.length,
        reminders,
      };

      remindersOutput.value = JSON.stringify(output, null, 2);
    }

    function hideSuggestions(): void {
      suggestionsList!.replaceChildren();
      suggestionsList!.style.display = "none";
    }

    function showSuggestions(query: string): void {
      suggestionsList!.replaceChildren();

      if (!query.trim()) {
        hideSuggestions();
        return;
      }

      const matches = fuse
        .search(query.trim())
        .slice(0, 8)
        .map((result) => result.item);

      if (!matches.length) {
        hideSuggestions();
        return;
      }

      for (const role of matches) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "list-group-item list-group-item-action";
        button.textContent = role.name;

        button.addEventListener("click", () => {
          input!.value = role.name;
          displayReminders(role);
          hideSuggestions();
        });

        suggestionsList!.appendChild(button);
      }

      suggestionsList!.style.display = "block";
    }

    function findRole(): void {
      const query = input!.value.trim().toLowerCase();

      const role = roles.find((role) => role.name.toLowerCase() === query);

      if (!role) {
        remindersOutput.value = "Role not found.";

        hideSuggestions();
        return;
      }

      displayReminders(role);
      hideSuggestions();
    }

    // Autocomplete as the user types.
    input.addEventListener("input", () => {
      showSuggestions(input!.value);
    });

    // Escape closes suggestions; Enter performs an exact search.
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        hideSuggestions();
      }

      if (event.key === "Enter") {
        event.preventDefault();
        findRole();
      }
    });

    // Find button performs an exact search.
    findButton?.addEventListener("click", findRole);

    // Hide suggestions when clicking elsewhere on the page.
    document.addEventListener("click", (event) => {
      if (
        !input!.contains(event.target as Node) &&
        !suggestionsList!.contains(event.target as Node)
      ) {
        hideSuggestions();
      }
    });
  }

  initAutocomplete().catch(console.error);
}
