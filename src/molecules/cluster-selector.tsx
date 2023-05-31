import { useCallback, useState } from "react";
import * as yup from "yup";
import { Form } from "react-final-form";

import ClusterUtils from "src/domain/cluster";
import type * as TCluster from "src/domain/cluster.d";
import { clusterValidator } from "src/utils/validators";
import { useSnackbar } from "src/contexts/notification-context";
import SettingButton from "src/atoms/setting-button";
import ChameleonText from "src/atoms/chameleon-text";

const clusterChangeAlert = (isError: boolean | undefined, moniker: string) => {
  const msg = !isError
    ? `Cluster changed to "${moniker}"`
    : "Address should be a proper URL";
  const variant: any = !isError
    ? { variant: "success", autoHideDuration: 1e3 }
    : { variant: "error", autoHideDuration: 2e3 };

  return { msg, variant };
};

interface ClusterProps {
  endpoint: string;
  moniker: string;
  name: string;
}

export default ({
  closeModal,
  cluster,
  clusters,
  presets,
  setCluster,
}: {
  cluster: ClusterProps;
  clusters: TCluster.ClusterInfo[];
  presets: any;
  setCluster: (cluster: TCluster.ClusterInfo | TCluster.Moniker) => boolean;
  closeModal: () => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [clusterMoniker, setClusterMoniker] = useState(cluster.moniker);

  const clusterUtils = ClusterUtils(presets.solana);

  const isCustomSelected = clusterMoniker === presets.custom.moniker;

  const onSaveCustomEndpoint = useCallback(
    async ({ endpoint }: { endpoint: string }) => {
      const customCluster = {
        endpoint,
        name: presets.custom.name,
        moniker: presets.custom.moniker,
      };

      const isError = setCluster(customCluster);

      const { msg, variant } = clusterChangeAlert(
        isError,
        customCluster.moniker
      );
      enqueueSnackbar(msg, variant);

      if (!isError && closeModal) closeModal();
    },
    [enqueueSnackbar, closeModal, presets, setCluster]
  );

  const onSavePresetEndpoint = useCallback(
    ({ endpoint }: { endpoint: TCluster.Moniker }) => {
      const isError = setCluster(endpoint);

      const { msg, variant } = clusterChangeAlert(isError, endpoint);
      enqueueSnackbar(msg, variant);

      if (!isError && closeModal) closeModal();
    },
    [enqueueSnackbar, closeModal, setCluster]
  );

  const onClusterChange = useCallback(
    (moniker: TCluster.Moniker) => {
      setClusterMoniker(moniker);

      if (!clusterUtils.isCustomMoniker(moniker)) {
        onSavePresetEndpoint({ endpoint: moniker });
      }
    },
    [clusterUtils, onSavePresetEndpoint]
  );

  return (
    <>
      <div className="flex items-center mt-2.5 rounded-xl ring-1 ring-white/5 overflow-hidden">
        {clusters.map((item, idx) => (
          <SettingButton
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            idx={idx}
            itemsCount={clusters.length}
            highlighted={clusterMoniker === item.moniker}
            onClick={() => onClusterChange(item.moniker)}
          >
            <div>
              <p className="text-sm text-white/70">{item.name}</p>
            </div>
          </SettingButton>
        ))}
      </div>

      {isCustomSelected && (
        <Form
          initialValues={{
            endpoint:
              presets.solana.endpoint === cluster.endpoint
                ? undefined
                : cluster.endpoint,
          }}
          onSubmit={onSaveCustomEndpoint}
          validate={clusterValidator(
            yup.object().shape({
              endpoint: yup.string().required().url(),
            })
          )}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-x-2 my-2">
                <input
                  type="text"
                  name="endpoint"
                  className="w-full rounded-md px-2 py-2 truncate bg-[#212128] text-white/50 placeholder:text-white/40 text-sm"
                  placeholder="RPC endpoint"
                />
                <button
                  type="submit"
                  className="flex justify-center items-center 
                    disabled:opacity-50 text-white bg-[#191B1F]  
                    rounded-md leading-none p-2.5 text-sm  font-semibold"
                >
                  <ChameleonText className="pb-0.5">Switch</ChameleonText>
                </button>
              </div>
            </form>
          )}
        </Form>
      )}
    </>
  );
};
