import React, { FC, useEffect, useState } from 'react';

import { useMeasurementsCtx } from '../../context/MeasurementsContext';
import { GraphProvider } from '../../context/GraphContext';
import { useMetasCtx } from '../../context/MetasContext';

import { Bounds, MeasMetaPath, Path, PointData } from '../../models/path';

import { GraphData, GraphPoint } from '../../assets/graph/types';

import { getRide } from '../../queries/rides';

import Graph from '../Graph/Graph';
import RidesMap from './RidesMap';
import useToast from '../createToast';
import Loading from '../Loading';
import GraphSelector from '../Graph/GraphSelector';
import { UseMarkersAction } from '../../models/graph';

const getGraphData = (path: Path): GraphData => {
  const x = (p: PointData) => new Date(p.metadata.timestamp).getTime();
  return path
    .map((p) => [x(p), p.value || 0] as GraphPoint)
    .sort(([x1, y1], [x2, y2]) => (x1 < x2 ? -1 : x1 === x2 ? 0 : 1));
};

import { CSVLink, CSVDownload } from 'react-csv';

const Rides: FC = () => {
  const headers = ['x', 'y'];

  const [selectedTaskID, setSelectedTaskID] = useState<number>();
  const [selectedMeasurementName, setSelectedMeasurementName] =
    useState<string>();
  const [selectedMeasurementBounds, setSelectedMeasurementBounds] =
    useState<Bounds>();

  useEffect(() => {
    // Checks if the selected graph is no longer present - if it isn't then set it to something that is there
    if (
      selectedMetas.length > 0 &&
      !selectedMetas.some((meta) => meta.TaskId === selectedTaskID)
    ) {
      setSelectedTaskID(selectedMetas[0].TaskId);
    } else if (selectedMetas.length === 0) {
      setSelectedTaskID(undefined);
    }
    if (
      selectedMeasurements.length > 0 &&
      !selectedMeasurements.some(
        (meas) => meas.name === selectedMeasurementName,
      )
    ) {
      setSelectedMeasurementName(selectedMeasurements[0].name);
    } else if (selectedMeasurements.length === 0) {
      setSelectedMeasurementName(undefined);
    }



  // Calculates the correct bounds for all paths - this should probably be completely refactored as bound are no longer properly used
  useEffect(() => {
    if (
      selectedMetas.length > 0 &&
      selectedMeasurementName &&
      paths[selectedMeasurementName]
    ) {
      const temp = paths[selectedMeasurementName];
      const minY = Math.min(
        ...(Object.keys(temp).map((k) => temp[+k].bounds?.minY) as number[]),
      );
      const maxY = Math.max(
        ...(Object.keys(temp).map((k) => temp[+k].bounds?.maxY) as number[]),
      );
      setSelectedMeasurementBounds({ minY: minY, maxY: maxY });
    }
  }, [paths, selectedMeasurementName]);

  const selectedMeasurement = selectedMeasurements.find(
    (meas) => meas.name === selectedMeasurementName,
  );

  console.log('paths', paths);

  return (
    <GraphProvider>
      <div className="map-container">
        <RidesMap
          paths={paths}
          selectedMetas={selectedMetas}
          selectedMeasurements={selectedMeasurements}
        />
        <GraphSelector
          onMeasurementChange={setSelectedMeasurementName}
          onTripChange={setSelectedTaskID}
          taskIds={selectedMetas.map((meta) => meta.TaskId)}
          measNames={selectedMeasurements
            .filter((meas) => meas.hasValue)
            .map((meas) => meas.name)}
          taskId={selectedTaskID}
          measName={selectedMeasurementName}
        />
        {!selectedMeasurementName || !selectedTaskID ? (
          <span>
            Select at least one trip and one measurement to display data.
          </span>
        ) : !(selectedMeasurementName in paths) ||
          !(selectedTaskID in paths[selectedMeasurementName]) ? (
          <span>
            This combination trip doesn&apos;t contain data for this
            measurement.
          </span>
        ) : (
          <Graph
            labelX="Time (h:m:s)"
            labelY={selectedMeasurementName}
            absolute={true}
            time={true}
            palette={selectedMeasurement?.palette}
            bounds={selectedMeasurementBounds}
            plot={{
              pathData: paths[selectedMeasurementName][selectedTaskID].path,
              data: getGraphData(
                paths[selectedMeasurementName][selectedTaskID].path,
              ),
              bounds: paths[selectedMeasurementName][selectedTaskID].bounds,
              label: 'r-' + selectedTaskID,
            }}
            selectedTaskID={selectedTaskID}
            selectedMeasurementName={selectedMeasurementName}
          />
        )}
      </div>
      <Loading loading={loading} />
    </GraphProvider>
  );
};

export default Rides;