var documenterSearchIndex = {"docs":
[{"location":"trajectories/#Molecular-Dynamics-Trajectories","page":"MD Trajectories","title":"Molecular Dynamics Trajectories","text":"","category":"section"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"This package provides convenience functions to analyze the secondary structure along molecular dynamics simulations. The user must provide a PDB file of the system  simulated and a trajectory file, which may be of one of the most common formats, as supported by Chemfiles. ","category":"page"},{"location":"trajectories/#Secondary-structure-map","page":"MD Trajectories","title":"Secondary structure map","text":"","category":"section"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The secondary structure map is the profile of the secondary structure computed for  each frame of the trajectory. This computation may be costly, particularly with the  DSSP algorithm, so it is recommeded to save the result. See Saving and loading a map for further information. ","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"A complete example for computing a secondary structure map is shown below:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"using ProteinSecondaryStructures \nusing PDBTools: readPDB \nusing Chemfiles: Trajectory\n\npdbfile = ProteinSecondaryStructures.Testing.data_dir*\"/Gromacs/system.pdb\"\ntrajectory_file = ProteinSecondaryStructures.Testing.data_dir*\"/Gromacs/trajectory.xtc\"\n\natoms = readPDB(pdbfile, \"protein\")\ntrajectory = Trajectory(trajectory_file)\n\nssmap = ss_map(atoms, trajectory) # returns a Matrix{Int}","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"In the example, we loaded a Gromacs xtc trajectory.  The method used to compute the secondary structure can be selected with the method keyword parameter, which defaults to stride:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"ssmap = ss_map(atoms, trajectory; method=stride_run)\nssmap = ss_map(atoms, trajectory; method=dssp_run)","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"note: Note\nImportantly, note that we have selected the \"protein\" atoms when reading the PDB  file of the trajectory. This is important, both to avoid unnecessary reading and  writting of coordiantes which are of no interest, and to guarantee that the  algorithm for computing secondary structure will not fail.","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"This will create a matrix that can be visualized, for instance, with:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"using Plots\nheatmap(ssmap,\n  xlabel=\"frame\",\n  ylabel=\"residue\",\n  framestyle=:box,\n  color=palette(:tab20c,10)\n)","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"producing the figure:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"(Image: heatmap)","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"where the colors refer to the code number fields of the Secondary structure classes table.","category":"page"},{"location":"trajectories/#Saving-and-loading-a-map","page":"MD Trajectories","title":"Saving and loading a map","text":"","category":"section"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The secondary structure map computed is just a matrix of integer codes. Thus, it can be saved or read in any preferred format. As a suggestion, it is possible to use writedlm and readdlm function from the DelimitedFiles package: ","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"using DelimitedFiles\n# save data to ssmap.dat\nwritedlm(\"ssmap.dat\", ssmap)\n# load data\nssmat = readdlm(\"ssmap.dat\", Int)","category":"page"},{"location":"trajectories/#Trajectory-secondary-structure-classes","page":"MD Trajectories","title":"Trajectory secondary structure classes","text":"","category":"section"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"From a precomputed secondary structure map, or from a trajectory, helper functions will provide the content of a specific call of secondary structure along the simulation:","category":"page"},{"location":"trajectories/#From-the-secondary-structure-map","page":"MD Trajectories","title":"From the secondary structure map","text":"","category":"section"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"Calling ss_content with a class identifier function and a map (as computed above), will return the content of that class along the trajectory:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> ss_content(is_alphahelix, ssmap)\n26-element Vector{Float64}:\n 0.21052631578947367\n 0.15789473684210525\n ⋮\n 0.13157894736842105","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The composition of classes for a given frame can also be retrieved from the content map:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> ss_composition(ssmap, 6)\nDict{String, Int64} with 10 entries:\n  \"310 helix\"   => 7\n  \"bend\"        => 0\n  \"turn\"        => 17\n  \"kappa helix\" => 0\n  \"beta strand\" => 25\n  \"beta bridge\" => 2\n  \"alpha helix\" => 12\n  \"pi helix\"    => 0\n  \"loop\"        => 0\n  \"coil\"        => 13","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"These functions are useful, because the computation of the secondary structure along the trajectory (the map) can be costly.","category":"page"},{"location":"trajectories/#Single-class,-througout-the-trajectory","page":"MD Trajectories","title":"Single class, througout the trajectory","text":"","category":"section"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"If the user wants to compute the content of a single class of secondary structures along a trajectory, that can be done without precomputing the secondary structure map (note, however, that the cost is similar).","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"For example, in the following script we compute the content of alpha-helices of the structure along the trajectory:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"using ProteinSecondaryStructures \nusing PDBTools: readPDB \nusing Chemfiles: Trajectory\n\npdbfile = ProteinSecondaryStructures.Testing.data_dir*\"/Gromacs/system.pdb\"\ntrajectory_file = ProteinSecondaryStructures.Testing.data_dir*\"/Gromacs/trajectory.xtc\"\n\natoms = readPDB(pdbfile, \"protein\")\ntrajectory = Trajectory(trajectory_file)\n\nhelical_content = ss_content(is_alphahelix, atoms, trajectory)","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The method to compute the secondary structure can be defined with the method keyword: ","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"helical_content = ss_content(is_alphahelix, atoms, trajectory; method=stride_run)\n#or\nhelical_content = ss_content(is_alphahelix, atoms, trajectory; method=dssp_run)","category":"page"},{"location":"trajectories/#Average-structure-per-residue","page":"MD Trajectories","title":"Average structure per residue","text":"","category":"section"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"Here we provide a example where we use some features of PDBTools.jl and Plots to illustrate the average content of alpha-helices for each residue of the protein, along the simulation. ","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"Here, we assume that a secondary structure map, ssmap, was computed using the instructions above.","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The goal is to obtain a figure similar to this one, in which in the upper pannel we show the evolution of the total alpha-helical content as a function of the simulation frames, and in the lower pannel we show the content of helices of each residue, with appropriate indexing. ","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"(Image: helical content)","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The script to produce the figure above is a manipulation of the ssmap output, using function from PDBTools and the plotting features of Plots. THe complete script is:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"using Plots, PDBTools\nPlots.default(fontfamily=\"Computer Modern\",linewidth=2,framestyle=:box)\nplt = plot(layout=(2,1))\nahelix = ss_content(is_alphahelix, ssmap)\nplot!(plt, subplot=1, \n    ahelix, label=nothing,\n    xlabel=\"simulation frame\", \n    ylabel=\"α-helical content\"\n )\nresidue_indexes=1:length(eachresidue(atoms))\none_letter_names = eachresidue(atoms) .|> resname .|> oneletter;\nstring_numbers = eachresidue(atoms) .|> resnum .|> string;\nxlabels = one_letter_names .* string_numbers\nahelix_avg = map(mean, eachrow(is_alphahelix.(ssmap)))\nxticks=(residue_indexes[begin:5:end],xlabels[begin:5:end])\nplot!(plt, subplot=2,\n    residue_indexes, \n    ahelix_avg, \n    label=nothing,\n    xlabel=\"Residue\",\n    ylabel=\"α-helical content\",\n    xticks=xticks, xrotation=60\n)\nsavefig(\"./helical_content.svg\")","category":"page"},{"location":"trajectories/#Step-by-step-construction-of-the-figure","page":"MD Trajectories","title":"Step-by-step construction of the figure","text":"","category":"section"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"First, we load the Plots and PDBTools packages, and set some default parameters for Plots for prettier output.","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> using Plots, PDBTools\n\njulia> Plots.default(fontfamily=\"Computer Modern\",linewidth=2,framestyle=:box)","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"We then initialize a plot with two pannels. The upper supblot will contain the alpha-helical content as a function simulation frames, and the lower subplot will contain the average content of helices for each residue.","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> plt = plot(layout=(2,1))","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"Next, we compute, from the secondary structure map, the alpha-helical content, for each frame of the trajectory, which will be printed in the first subplot of the figure:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> ahelix = ss_content(is_alphahelix, ssmap)\n\njulia> plot!(plt, subplot=1, \n           ahelix, label=nothing, \n           xlabel=\"simulation frame\", \n           ylabel=\"α-helical content\"\n        )","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"For the second plot, we first define a residue range, with the number of residues of the protein, using PDBTools.eachresidue iterator. Here, length(eachresidue(atoms)) is just the number of residues of the protein:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> residue_indexes=1:length(eachresidue(atoms))\n1:76","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"We the extract the names of all residues, which we will use for creating the x-labels of our plot. We iterate over all residues first to extract their names, which are converted to one-letter codes, and these are concateneted (with the * operation on strings), with the residue numbers converted to strings: ","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> one_letter_names = eachresidue(atoms) .|> resname .|> oneletter;\n\njulia> string_numbers = eachresidue(atoms) .|> resnum .|> string;\n\njulia> xlabels = one_letter_names .* string_numbers\n76-element Vector{String}:\n \"M1\"\n \"Q2\"\n ⋮\n \"G76\"","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The y-axis of our plot will contain the average alpha-helical content for each residue. To extract that, we will first convert the ssmap to matrix of 0s and 1s, with the broadcast of the is_alphahelix function:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> is_alphahelix.(ssmap)\n76×26 BitMatrix:\n 0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0\n 0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0\n ⋮              ⋮              ⋮              ⋮              ⋮              ⋮\n 0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The average of each row is the the average content of helices for each residue:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> ahelix_avg = map(mean, eachrow(is_alphahelix.(ssmap)))\n76-element Vector{Float64}:\n 0.0\n 0.0\n ⋮\n 0.0","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"We can finally plot the second supblot of our figure, with the note that we have filtered some x-tick labels to avoid having a crowded axis:","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"julia> plot!(plt, subplot=2,\n           residue_indexes, \n           ahelix_avg, \n           label=nothing,\n           xlabel=\"Residue\",\n           ylabel=\"α-helical content\",\n           xticks=(residue_indexes[begin:5:end], xlabels[begin:5:end]),\n           xrotation=60,\n       )\n\njulia> savefig(\"./helical_content.svg\")","category":"page"},{"location":"trajectories/","page":"MD Trajectories","title":"MD Trajectories","text":"The final line saves the figure to an external file.","category":"page"},{"location":"citations/#Citations","page":"Citations","title":"Citations","text":"","category":"section"},{"location":"citations/","page":"Citations","title":"Citations","text":"If you use the STRIDE algorithm for secondary structure prediction, please cite:","category":"page"},{"location":"citations/","page":"Citations","title":"Citations","text":"Frishman,D & Argos,P. (1994) Knowledge-based secondary structure assignment. Proteins: structure, function and genetics, 23, 566-579.\nKabsch,W. & Sander,C. (1982) Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features. Biopolymers, 22: 2577-2637.","category":"page"},{"location":"citations/","page":"Citations","title":"Citations","text":"If you use the DSSP algorithm for secondary structure prediction, please cite:","category":"page"},{"location":"citations/","page":"Citations","title":"Citations","text":"Joosten RP, te Beek TAH, Krieger E, Hekkelman ML, Hooft RWW, Schneider R, Sander C, Vriend A series of PDB related databases for everyday needs. Nuc. Acids Res. 2009; 39:D411-D419.\nKabsch W, Sander C. Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features. Biopolymers 1982; 22:2577-2637. ","category":"page"},{"location":"explanation/#Explanation","page":"Explanation","title":"Explanation","text":"","category":"section"},{"location":"explanation/#Overview","page":"Explanation","title":"Overview","text":"","category":"section"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"This package uses STRIDE or DSSP to compute secondary structures of proteins from their atomic coordinates.","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"The functions are divided into two groups: ","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"Computing the secondary structure from a single PDB file.\nComputing the secondary structure throughout a Molecular Dynamics Simulation.","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"Additionally, the subset of the strucuture that will be considered for the calculations can be  defined through the interface with the PDBTools package.","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"note: Note\nBy default, only atoms of standard protein residues will be considered from the PDB file. It  is possible to select different subsets of atoms with the selection keyword, but then STRIDE or DSSP may fail with internal errors if the residue or atom types are not recognized.  The selection keyword follows the PDBTools.jl selection syntax.","category":"page"},{"location":"explanation/#Secondary-structure-classes","page":"Explanation","title":"Secondary structure classes","text":"","category":"section"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"The output of STRIDE or DSSP follow the convention of secondary strucure codes, which are:","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"Secondary structure ss code code number\n\"310 helix\" \"G\" 1\n\"alpha helix\" \"H\" 2\n\"pi helix\" \"I\" 3\n\"kappa helix\" \"P\" 4\n\"turn\" \"T\" 5\n\"beta strand\" \"E\" 6\n\"beta bridge\" \"B\" 7\n\"bend\" \"S\" 8\n\"coil\" \"C\" 9\n\"loop\" \" \" 10","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"See the DSSP secondary structure classification for further information.","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"The code number are used here to output the matrices of secondary structures obtained from trajectory runs. ","category":"page"},{"location":"explanation/#Data-structure","page":"Explanation","title":"Data structure","text":"","category":"section"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"The output of the secondary structure calculations is a vector of SSData elements, with the following data, for each residue:","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"resname::String - residue name\nchain::String - chain identifier\nresnum::Int - residue number\nsscode::String - secondary structure code\nphi::Float64 - phi dihedral angle\npsi::Float64 - psi dihedral angle\narea::Float64 - solvent accessible area (stride specific)\nkappa::Float64 - virtual bond angle (dssp specific)\nalpha::Float64 - virtual torsion angle (dssp specific)","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"The output of stride_run or dssp_run is a vector of SSData structures, one for each residue. For example: ","category":"page"},{"location":"explanation/","page":"Explanation","title":"Explanation","text":"julia> using ProteinSecondaryStructures\n\n# Replace the next assignment with a custom PDB file name\njulia> pdbfile = ProteinSecondaryStructures.Testing.examples[1].filename\n\"/home/user/.julia/dev/ProteinSecondaryStructures/test/data/pdb/pdb1fmc.pdb\"\n\njulia> ss = stride_run(pdbfile);\n\njulia> ss[1]\nSSData(\"MET\", \"A\", 1, \"C\", 360.0, 150.62, 234.4, 0.0, 0.0)\n\njulia> ss[1].sscode\n\"C\"\n\njulia> class(ss[1].sscode)\n\"coil\"","category":"page"},{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/#Basic-data-structure","page":"Reference","title":"Basic data structure","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"SSData","category":"page"},{"location":"reference/#ProteinSecondaryStructures.SSData","page":"Reference","title":"ProteinSecondaryStructures.SSData","text":"SSData\n\nA struct to hold secondary structure data for a single residue. The fields are:\n\nresname::String - residue name\nchain::String - chain identifier\nresnum::Int - residue number\nsscode::String - secondary structure code\nphi::Float64 - phi dihedral angle\npsi::Float64 - psi dihedral angle\narea::Float64 - solvent accessible area (stride specific)\nkappa::Float64 - virtual bond angle (dssp specific)\nalpha::Float64 - virtual torsion angle (dssp specific)\n\n\n\n\n\n","category":"type"},{"location":"reference/#Single-PDB-runs","page":"Reference","title":"Single-PDB runs","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"stride_run\ndssp_run","category":"page"},{"location":"reference/#ProteinSecondaryStructures.stride_run","page":"Reference","title":"ProteinSecondaryStructures.stride_run","text":"stride_run(pdb_file::String; selection=\"protein\")\nstride_run(atoms::AbstractVector{<:PDBTools.Atom})\n\nRun stride on the pdb file and return a vector containing the stride detailed secondary structure information for each residue.\n\nWhen passing a PDB file, by default only the atoms belonging to standard protein residues are considered. This can be changed by setting the selection keyword argument to a different selection string, or function, following the PDBTools.jl syntax. Note that STRIDE will fail if residue or atoms types not recognized. \n\n\n\n\n\n","category":"function"},{"location":"reference/#ProteinSecondaryStructures.dssp_run","page":"Reference","title":"ProteinSecondaryStructures.dssp_run","text":"dssp_run(pdb_file::String; selection=\"protein\")\ndssp_run(atoms::AbstractVector{<:PDBTools.Atom})\n\nRun DSSP on the pdb file and return a vector containing the detailed secondary structure information for each residue.\n\nWhen passing a PDB file, by default only the atoms belonging to standard protein residues are considered. This can be changed by setting the selection keyword argument to a different selection string, or function, following the PDBTools.jl syntax. Note that DSSP will fail if residue or atoms types not recognized. \n\n\n\n\n\n","category":"function"},{"location":"reference/","page":"Reference","title":"Reference","text":"ss_composition(::AbstractVector{<:SSData})\nclass\nProteinSecondaryStructures._is_class","category":"page"},{"location":"reference/#ProteinSecondaryStructures.ss_composition-Tuple{AbstractVector{<:SSData}}","page":"Reference","title":"ProteinSecondaryStructures.ss_composition","text":"ss_composition(data::AbstractVector{<:SSData})\n\nCalculate the secondary structure composition of the data. Returns a dictionary of the secondary structure types and their counts.\n\n\n\n\n\n","category":"method"},{"location":"reference/#ProteinSecondaryStructures.class","page":"Reference","title":"ProteinSecondaryStructures.class","text":"class(ss::Union{SSData, SSData, Int, String})\n\nReturn the secondary structure class. The input may be a SSData object,  a secondary structure Int code (1-8) or a secondary structure type string (G, H, ..., C).\n\nThe secondary structure classes are:\n\nSecondary structure ss code code number\n\"310 helix\" \"G\" 1\n\"alpha helix\" \"H\" 2\n\"pi helix\" \"I\" 3\n\"kappa helix\" \"P\" 4\n\"turn\" \"T\" 5\n\"beta strand\" \"E\" 6\n\"beta bridge\" \"B\" 7\n\"bend\" \"S\" 8\n\"coil\" \"C\" 9\n\"loop\" \" \" 10\n\n\n\n\n\n","category":"function"},{"location":"reference/#ProteinSecondaryStructures._is_class","page":"Reference","title":"ProteinSecondaryStructures._is_class","text":"is_anyhelix(ss::SSData)\nis_alphahelix(ss::SSData)\nis_pihelix(ss::SSData)\nis_kappahelix(ss::SSData)\nis_310helix(ss::SSData)\nis_anystrand(ss::SSData)\nis_betastrand(ss::SSData)\nis_betabridge(ss::SSData)\nis_turn(ss::SSData)\nis_bend(ss::SSData)\nis_coil(ss::SSData)\nis_turn(ss::SSData)\n\nReturn true if the data is of the given secondary structure type.\n\n\n\n\n\n","category":"function"},{"location":"reference/#For-trajectory-analysis","page":"Reference","title":"For trajectory analysis","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"ss_map\nss_content\nss_composition(::AbstractMatrix{Int}, ::Int)","category":"page"},{"location":"reference/#ProteinSecondaryStructures.ss_map","page":"Reference","title":"ProteinSecondaryStructures.ss_map","text":"ss_map(pdbfile::AbstractString, trajectory::Chemfiles.Trajectory; selection=\"protein\")\nss_map(atoms::AbstractVector{<:PDBTools.Atom}, trajectory::Chemfiles.Trajectory)\n\nCalculate the secondary structure map of the trajectory.  Returns a matrix of secondary structure codes, where each row is a residue and each column is a frame.\n\nThe atoms to be considered may be provided directly with an atoms vector, or by reading a PDB file, in which case the selection keyword argument is used to select the atoms to be considered.\n\nThe show_progress keyword argument controls whether a progress bar is shown.\n\n\n\n\n\n","category":"function"},{"location":"reference/#ProteinSecondaryStructures.ss_content","page":"Reference","title":"ProteinSecondaryStructures.ss_content","text":"ss_content(f::F, atoms::AbstractVector{<:PDBTools.Atom}, trajectory::Chemfiles.Trajectory)\n\nCalculate the secondary structure content of the trajectory. f is the function that returns, for each residue, if the secondary structure is of a certain type. For example, to calculate  the alpha helix content, use f = is_alphahelix.\n\nThe show_progress keyword argument controls whether a progress bar is shown.\n\n\n\n\n\nss_content(f::F, ssmap::AbstractMatrix{Int})\n\nCalculates the secondary structure content of the trajectory. f is the function that returns, for each residue, if the secondary structure is of a certain type. For example, to calculate the alpha helix content, use f = is_alphahelix.\n\nHere, ssmap is the secondary structure map of the trajectory, as returned by the ss_map function.\n\n\n\n\n\n","category":"function"},{"location":"reference/#ProteinSecondaryStructures.ss_composition-Tuple{AbstractMatrix{Int64}, Int64}","page":"Reference","title":"ProteinSecondaryStructures.ss_composition","text":"ss_composition(ssmap::AbstractMatrix{Int}, iframe::Int}\n\nCalculates the secondary structure composition of the trajectory. Returns a dictionary of the secondary structure types and their counts, for the chosen frame.\n\n\n\n\n\n","category":"method"},{"location":"single_pdb/#Single-PDB-files","page":"Single PDB files","title":"Single PDB files","text":"","category":"section"},{"location":"single_pdb/#Compute-secondary-structures","page":"Single PDB files","title":"Compute secondary structures","text":"","category":"section"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"First, install the package, according to the Installation instructions.","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"Load the package with:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> using ProteinSecondaryStructures","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"Here, we illustrate the computation of the secondary structure of a PDB file provides as an example:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> pdbfile = ProteinSecondaryStructures.Testing.examples[1].filename\n\"/home/user/.julia/dev/ProteinSecondaryStructures/test/data/pdb/pdb1fmc.pdb\"","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"Then, to compute the secondary structure using the STRIDE algorithm, use:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> ss = stride_run(pdbfile)\n510-element Vector{SSData}:\n SSData(\"MET\", \"A\", 1, \"C\", 360.0, 150.62, 234.4, 0.0, 0.0)\n SSData(\"PHE\", \"A\", 2, \"C\", -69.01, 138.78, 162.9, 0.0, 0.0)\n ⋮\n SSData(\"ASN\", \"B\", 255, \"C\", -130.75, 360.0, 114.8, 0.0, 0.0)","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"The output is a vector of SSData elements, which contain the residue name,  chain, residue number, and secondary structure code. The list of codes follow the DSSP convention, described in Secondary structure classes.","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"note: Note\nAlternativelly to the stride_run function, the dssp_run function can be used, to compute the secondary structures as defined by DSSP.","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"The details of the SSData structure that contain the output for each residue are described in the Data structure section.","category":"page"},{"location":"single_pdb/#Secondary-structure-composition","page":"Single PDB files","title":"Secondary structure composition","text":"","category":"section"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"Given the ss output of the stride_run or dssp_run functions, an overview of content of the secondary structure can be obtained with the ss_composition function:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> comp = ss_composition(ss)\nDict{String, Int64} with 12 entries:\n  \"bend\"        => 0\n  \"kappa helix\" => 0\n  \"beta strand\" => 77\n  \"strand\"      => 81\n  \"loop\"        => 0\n  \"310 helix\"   => 21\n  \"turn\"        => 70\n  \"helix\"       => 263\n  \"beta bridge\" => 4\n  \"alpha helix\" => 242\n  \"pi helix\"    => 0\n  \"coil\"        => 96\n\njulia> comp[\"alpha helix\"]\n242","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"The output is a dictionary containing the number of residues that were classified in each class. As shown above, this number can be retrieved individually.","category":"page"},{"location":"single_pdb/#Retrieving-classes","page":"Single PDB files","title":"Retrieving classes","text":"","category":"section"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"The class of secondary structure of each residue can be retrived with the class function:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> ss[10]\nSSData(\"ASP\", \"A\", 10, \"T\", -53.61, 124.03, 78.7, 0.0, 0.0)\n\njulia> class(ss[10])\n\"turn\"","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"And helper functions are available to obtain boolean vectors to check if each residue belong to some class. For example:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> is_anyhelix(ss[10])\nfalse\n\njulia> is_anyhelix.(ss)\n255-element BitVector:\n 0\n 0\n 0\n 1\n ⋮\n 0\n 0\n 0","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"where in the last example we used the broadcast operation (the dot) to obtain the result of the application of the function for the complete array of residues.","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"The following functions are available:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"is_anyhelix\nis_alphahelix\nis_pihelix\nis_310helix\nis_kappahelix\nis_anystrand\nis_betastrand\nis_betabridge\nis_turn\nis_bend\nis_coil","category":"page"},{"location":"single_pdb/#Using-PDBTools","page":"Single PDB files","title":"Using PDBTools","text":"","category":"section"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"The PDBTools provides a simple and lighweight interface to select specific subsets of atoms from the structures.","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"Install PDBTools with:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> import Pkg; Pkg.add(\"PDBTools\")","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"Then, load both packages and set the PDB file name with, for example:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> using ProteinSecondaryStructures, PDBTools\n\njulia> pdbfile = ProteinSecondaryStructures.Testing.examples[1].filename\n\"/home/user/.julia/dev/ProteinSecondaryStructures/test/data/pdb/pdb1fmc.pdb\"","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"The PDBTtools.readPDB function can now read tha atom data from the PDB file, but it is possible to select a subset of atoms from the structure with a simple selection syntax:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> pdb = readPDB(pdbfile, \"protein and chain A\") # read only protein atoms from chain A\n   Array{Atoms,1} with 1876 atoms with fields:\n   index name resname chain   resnum  residue        x        y        z occup  beta model segname index_pdb\n       1    N     MET     A        1        1   22.518   17.379   31.003  1.00 34.99     1       -         1\n       2   CA     MET     A        1        1   23.426   17.764   32.113  1.00 34.03     1       -         2\n                                                       ⋮ \n    1876  OXT     ASN     A      255      255   44.876   38.278   -2.437  1.00 54.24     1       -      1876","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"The atoms are loaded in a vector of type Vector{<:PDBTools.Atom}. This vector can be fed in place of the PDB file names, and the secondary structures will be computed for the selected subsets of atoms:","category":"page"},{"location":"single_pdb/","page":"Single PDB files","title":"Single PDB files","text":"julia> ss = stride_run(pdb)\n255-element Vector{SSData}:\n SSData(\"MET\", \"A\", 1, \"C\", 360.0, 150.62, 234.4, 0.0, 0.0)\n SSData(\"PHE\", \"A\", 2, \"C\", -69.01, 138.78, 162.9, 0.0, 0.0)\n ⋮\n SSData(\"ASN\", \"A\", 255, \"C\", -130.97, 360.0, 100.9, 0.0, 0.0)","category":"page"},{"location":"#ProteinSecondaryStructures.jl","page":"Home","title":"ProteinSecondaryStructures.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ProteinSecondaryStructures.jl parses STRIDE and DSSP secondary structure prediction outputs, to make them convenient to use from Julia, particularly for the analysis of molecular dynamics simulations. ","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"In Julia, install ProteinSecondaryStructures with:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> import Pkg; Pkg.add(\"ProteinSecondaryStructures\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"There is no need to independently install STRIDE or DSSP.","category":"page"},{"location":"#Citation","page":"Home","title":"Citation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"If you use the STRIDE algorithm for secondary structure prediction, please cite:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Frishman,D & Argos,P. (1994) Knowledge-based secondary structure assignment. Proteins: structure, function and genetics, 23, 566-579.\nKabsch,W. & Sander,C. (1982) Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features. Biopolymers, 22: 2577-2637.","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you use the DSSP algorithm for secondary structure prediction, please cite:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Joosten RP, te Beek TAH, Krieger E, Hekkelman ML, Hooft RWW, Schneider R, Sander C, Vriend A series of PDB related databases for everyday needs. Nuc. Acids Res. 2009; 39:D411-D419.\nKabsch W, Sander C. Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features. Biopolymers 1982; 22:2577-2637. ","category":"page"}]
}
