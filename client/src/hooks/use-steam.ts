import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useDepots(appId: string | undefined) {
  return useQuery({
    queryKey: [api.steam.depots.path, appId],
    queryFn: async () => {
      if (!appId) throw new Error("App ID required");
      const url = buildUrl(api.steam.depots.path, { appid: appId });
      const res = await fetch(url);
      if (res.status === 404) return [];
      if (!res.ok) throw new Error("Failed to fetch depots");
      return api.steam.depots.responses[200].parse(await res.json());
    },
    enabled: !!appId && appId.length > 2,
  });
}

type GenerateInput = z.infer<typeof api.steam.generate.input>;

export function useGenerateManifest() {
  return useMutation({
    mutationFn: async (data: GenerateInput) => {
      const res = await fetch(api.steam.generate.path, {
        method: api.steam.generate.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Generation failed");
      }

      // Handle file download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `manifest_${data.appId}_${data.depotId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    },
  });
}
