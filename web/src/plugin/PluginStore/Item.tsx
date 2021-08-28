import { Avatar } from '@/components/Avatar';
import { Button } from 'antd';
import React, { useState } from 'react';
import {
  PluginManifest,
  showToasts,
  t,
  useAsyncRequest,
} from 'tailchat-shared';
import { pluginManager } from '../manager';

/**
 * 插件项
 */
export const PluginStoreItem: React.FC<{
  manifest: PluginManifest;
  installed: boolean;
  builtin?: boolean;
}> = React.memo((props) => {
  const { manifest, builtin = false } = props;
  const [installed, setInstalled] = useState(props.installed);

  const [{ loading }, handleInstallPlugin] = useAsyncRequest(async () => {
    await pluginManager.installPlugin(manifest);
    if (manifest.requireRestart === true) {
      showToasts(t('插件安装成功, 需要重启后生效'), 'success');
    } else {
      showToasts(t('插件安装成功'), 'success');
    }
    setInstalled(true);
  }, [manifest]);

  return (
    <div className="rounded-md flex w-80 h-36 bg-black bg-opacity-40 py-2 px-3">
      <div className="flex w-full">
        <div className="mr-2">
          <Avatar shape="square" src={manifest.icon} name={manifest.label} />
        </div>

        <div className="flex flex-col flex-1">
          <div className="font-bold">{manifest.label}</div>

          <div className="text-xs text-gray-300 text-opacity-50">
            {manifest.name}
          </div>

          <div className="flex-1 overflow-auto">{manifest.description}</div>

          <div className="mt-1 text-right">
            {builtin ? (
              <Button type="primary" disabled={true}>
                {t('已安装')}
              </Button>
            ) : installed ? (
              <Button type="primary">{t('已安装')}</Button>
            ) : (
              <Button
                type="primary"
                loading={loading}
                onClick={handleInstallPlugin}
              >
                {t('安装')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
PluginStoreItem.displayName = 'PluginStoreItem';
